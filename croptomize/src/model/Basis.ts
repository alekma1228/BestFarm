import { BasisLocation } from './BasisLocation'
import { computed, observable, action } from 'mobx'
import moment from 'moment-timezone'
import {
  getMonthFromMonthSymbol,
  getYearFromSymbol,
  colorForSymbol,
  pictureForSymbol,
  getNameFromSymbol,
  getNextImportantMonthForCropType,
  getCropTypeForCropSymbol,
  changeMonthForSymbol,
  changeMonthForContractSymbol,
} from './Symbols'
import { GrainBid, QuoteResult } from '../services/MarketDataService'

export interface BasisDatapoint {
  date: Date
  priceInCents: number
}

export class Basis {
  cbotSymbol: string
  basisContractSymbol?: string
  cashContractSymbol?: string
  deliveryStart?: Date
  deliveryEnd?: Date
  location: BasisLocation

  @observable currentPriceInCents?: number
  @observable currentBasisInCents?: number
  @observable lastUpdated?: Date
  @observable firstPriceInCents?: number
  @observable historicalData?: BasisDatapoint[]
  @observable bidsByDeliveryDate: { [key: string]: GrainBid } = {}

  constructor(
    location: BasisLocation,
    cbotSymbol: string,
    basisContractSymbol?: string,
    cashContractSymbol?: string,
    deliveryStart?: Date,
    deliveryEnd?: Date,
  ) {
    this.location = location

    this.cbotSymbol = cbotSymbol
    this.basisContractSymbol = basisContractSymbol
    this.cashContractSymbol = cashContractSymbol
    this.deliveryStart = deliveryStart
    this.deliveryEnd = deliveryEnd
  }

  deriveNewBasisForDate(dateString: string, deliveryStartDate?: Date, deliveryEndDate?: Date) {
    const [month, year] = dateString.split(' ')

    const newSymbol = this.isCBOT ? changeMonthForSymbol(this.cbotSymbol, month, year) : this.cbotSymbol
    const newBasisContractSymbol = this.isCBOT
      ? this.basisContractSymbol
      : changeMonthForContractSymbol(this.basisContractSymbol, month, year)
    const newCashContractSymbol = this.isCBOT
      ? this.cashContractSymbol
      : changeMonthForContractSymbol(this.cashContractSymbol, month, year)

    const newBasis = new Basis(
      this.location,
      newSymbol,
      newBasisContractSymbol,
      newCashContractSymbol,
      deliveryStartDate,
      deliveryEndDate,
    )

    newBasis.bidsByDeliveryDate = this.bidsByDeliveryDate

    return newBasis
  }

  displayColor() {
    return colorForSymbol(this.cbotSymbol)
  }

  picture() {
    return pictureForSymbol(this.cbotSymbol)
  }

  displayDate() {
    return this.deliveryEnd ? moment(this.deliveryEnd).format('MMM YYYY') : this.basisDisplayDate()
  }

  basisDisplayDate() {
    return `${getMonthFromMonthSymbol(this.cbotSymbol)} ${getYearFromSymbol(this.cbotSymbol)}`
  }

  @action
  addBids(bids: GrainBid[]) {
    if (this.isCBOT) {
      // There are no cash bids for CBOT
      return
    }

    for (const bid of bids) {
      if (getCropTypeForCropSymbol(bid.symbol) === getCropTypeForCropSymbol(this.cbotSymbol)) {
        this.bidsByDeliveryDate[bid.delivery_end] = bid
      }
    }
  }

  @action
  updateFromQuotes(cashQuote?: QuoteResult, basisQuote?: QuoteResult) {
    if (!cashQuote) {
      return
    }

    // CBOT symbols like ZCU19 are returned in cents. Contract symbols are returned in dollars.
    this.currentPriceInCents = this.isCBOT ? cashQuote.lastPrice : cashQuote.lastPrice * 100
    this.lastUpdated = moment(cashQuote.tradeTimestamp).toDate()

    if (basisQuote) {
      this.currentBasisInCents = basisQuote.lastPrice
    }
  }

  @computed
  get hasHistoricalData() {
    return this.historicalData && this.historicalData.length > 0
  }

  @computed
  get displayName() {
    return getNameFromSymbol(this.cbotSymbol)
  }

  @computed
  get cropSymbol() {
    return this.cbotSymbol.slice(0, 2)
  }

  @computed
  get cropType() {
    return getCropTypeForCropSymbol(this.cropSymbol)
  }

  @computed
  get formattedPrice() {
    if (!this.currentPriceInCents) {
      return '-'
    }

    return `$${(this.currentPriceInCents / 100).toFixed(2)}`
  }

  @computed
  get lastUpdatedString() {
    if (this.lastUpdated) {
      return moment(this.lastUpdated)
        .tz(moment.tz.guess())
        .format('hh:mm a z')
        .toLowerCase()
    }

    return ''
  }

  @computed
  get priceChangePercentage() {
    if (!this.currentPriceInCents || !this.firstPriceInCents) {
      return 0
    }

    return ((this.currentPriceInCents - this.firstPriceInCents) / this.firstPriceInCents) * 100
  }

  @computed
  get quoteSymbol() {
    if (this.cashContractSymbol) {
      return this.cashContractSymbol
    }

    return this.cbotSymbol
  }

  @computed
  get month() {
    return getMonthFromMonthSymbol(this.cbotSymbol)
  }

  @computed
  get year() {
    return getYearFromSymbol(this.cbotSymbol)
  }

  generateFakeData() {
    const data: BasisDatapoint[] = []

    const date = moment()

    while (data.length < 30) {
      data.push({
        date: date.toDate(),
        priceInCents: 400 + parseFloat((Math.random() * 100).toFixed(2)),
      })
      date.add(-1, 'days')
    }

    return data
  }

  isEqual(otherBasis: Basis) {
    return otherBasis.cbotSymbol === this.cbotSymbol && this.displayDate === otherBasis.displayDate
  }

  @computed
  get isCBOT() {
    return this.cashContractSymbol === undefined
  }

  nextBasis() {
    const nextImportantMonth = getNextImportantMonthForCropType(getCropTypeForCropSymbol(this.cbotSymbol.slice(0, 2)))
    const newSymbol = changeMonthForSymbol(this.cbotSymbol, nextImportantMonth.month, nextImportantMonth.year)

    if (this.isCBOT) {
      return new Basis(this.location, newSymbol)
    }

    return this
  }
}

export interface BasisMonth {
  month: string
  year: string
}
