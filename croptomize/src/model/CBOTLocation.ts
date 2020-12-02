import { BasisLocation } from './BasisLocation'
import { computed, action } from 'mobx'
import { Basis } from './Basis'
import { GrainBid } from '../services/MarketDataService'

// Special location for tracking the Chicago Board of Trade prices

export class CBOTLocation extends BasisLocation {
  constructor() {
    super('CBOT', 'Chicago', 'IL')
  }

  @action
  addBasisForBid(bid: GrainBid) {
    for (const basis of this.trackedBasises) {
      if (basis.cbotSymbol === bid.symbol) {
        return
      }
    }

    this.trackedBasises.push(new Basis(this, bid.symbol))
  }

  @computed
  get displayName() {
    return 'Chicago Board of Trade'
  }

  isCBOTLocation() {
    return true
  }
}
