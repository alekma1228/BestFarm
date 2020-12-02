import moment from 'moment'
import { Basis } from './Basis'
import { observable, action, computed } from 'mobx'
import { GrainBid, GrainBidsResult } from '../services/MarketDataService'
import { getCropTypeForCropSymbol } from './Symbols'

export class BasisLocation {
  @observable trackedBasises: Basis[]
  @observable city: string
  @observable state: string
  @observable company: string
  @observable locationId?: number

  constructor(company: string, city: string, state: string, locationId?: number, trackedBasises: Basis[] = []) {
    this.city = city
    this.state = state
    this.company = company
    this.locationId = locationId

    this.trackedBasises = trackedBasises

    for (const basis of trackedBasises) {
      basis.location = this
    }
  }

  isPlaceholder() {
    return false
  }

  @action
  addBasis(newBasis: Basis) {
    for (const basis of this.trackedBasises) {
      if (basis.quoteSymbol === newBasis.quoteSymbol) {
        // We are already tracking this symbol
        return
      }
    }

    newBasis.location = this
    this.trackedBasises.push(newBasis)
  }

  @action
  addBasisForBid(bid: GrainBid, fromResult: GrainBidsResult) {
    for (const basis of this.trackedBasises) {
      if (basis.cbotSymbol === bid.symbol) {
        // We are already tracking this symbol
        basis.addBids(fromResult.bids)
        return
      }
    }

    const newBasis = new Basis(
      this,
      bid.symbol,
      bid.basisSymbol,
      bid.cashPriceSymbol,
      moment(bid.delivery_start).toDate(),
      moment(bid.delivery_end).toDate(),
    )

    newBasis.currentPriceInCents = parseFloat(bid.cashprice) * 100
    newBasis.currentBasisInCents = parseFloat(bid.basis)
    newBasis.lastUpdated = moment(bid.as_of, 'M/D/YY').toDate()
    newBasis.addBids(fromResult.bids)
    this.trackedBasises.push(newBasis)
  }

  @action
  removeTrackedBasis(basis: Basis) {
    if (basis.location !== this) {
      return
    }

    this.trackedBasises = this.trackedBasises.filter(compBasis => !compBasis.isEqual(basis))
  }

  findSimilarBasis(otherBasis: Basis) {
    for (const basis of this.trackedBasises) {
      if (getCropTypeForCropSymbol(basis.cbotSymbol) === getCropTypeForCropSymbol(otherBasis.cbotSymbol)) {
        return basis
      }
    }

    return
  }

  @computed
  get defaultBasis() {
    if (this.trackedBasises.length > 0) {
      return this.trackedBasises[0]
    }

    return undefined
  }

  @computed
  get displayName() {
    return `${this.city}, ${this.state} (${this.company})`
  }

  isCBOTLocation() {
    return false
  }

  hasCropWithSymbol(cropSymbol: string) {
    return this.trackedBasises.find(basis => basis.cropSymbol === cropSymbol) !== undefined
  }
}
