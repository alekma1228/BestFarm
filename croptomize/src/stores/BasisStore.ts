import { observable, computed, action, runInAction } from 'mobx'
import moment from 'moment-timezone'
import { ServiceRegistry } from '../services/ServiceRegistry'
import { Basis } from '../model/Basis'
import { BasisLocation } from '../model/BasisLocation'
import { GrainBid, GrainBidsResult, QuoteResult, HistoricalDateRangeOption } from '../services/MarketDataService'
import { RootStore } from './RootStore'
import { BasisDateOption } from './UIStore'
import { CBOTLocation } from '../model/CBOTLocation'
import { getSymbolForMonth } from '../model/Symbols'
import { AdjustEvent, Adjust } from 'react-native-adjust'
import { AppEventsLogger } from 'react-native-fbsdk'

export class BasisStore {
  @observable basisLocations: BasisLocation[]
  @observable updateDate?: Date

  constructor(private services: ServiceRegistry, private rootStore: RootStore) {
    this.basisLocations = []
    this.initializeData()
  }

  private initializeData() {
    const loadPromise = this.rootStore.isFreeUser
      ? this.services.userDataService.loadDefaultLocations()
      : this.services.userDataService.loadBasisLocations()

    loadPromise
      .then(basisLocations => {
        runInAction(() => {
          this.basisLocations = basisLocations
          return this.refresh()
        })
      })
      .catch(ex => console.log(ex))
  }

  @action
  async refresh() {
    if (this.basisLocations.length < 1) {
      return
    }

    if (this.updateDate && moment.duration(moment().diff(this.updateDate)).asMinutes() < 1) {
      return
    }

    Adjust.trackEvent(new AdjustEvent('z9qerz'))
    AppEventsLogger.logEvent('RefreshMarketFeed')

    const allTrackedBasises = []

    for (const location of this.basisLocations) {
      for (const basis of location.trackedBasises) {
        allTrackedBasises.push(basis)
      }
    }

    await this.loadDataForBasises(allTrackedBasises)

    return this.saveLocations()
  }

  @action
  async deleteBasis(basis: Basis) {
    if (basis.location) {
      basis.location.removeTrackedBasis(basis)
      this.basisLocations = this.basisLocations.filter(location => location.trackedBasises.length > 0)
    }

    return this.saveLocations()
  }

  @action
  async trackBasisForBid(bid: GrainBid, fromResult: GrainBidsResult) {
    Adjust.trackEvent(new AdjustEvent('62lvyk'))
    AppEventsLogger.logEvent('AddCrop')

    let isNewLocation = true
    for (const location of this.basisLocations) {
      if (
        location.company === fromResult.company &&
        location.state === fromResult.state &&
        location.city === fromResult.city
      ) {
        location.addBasisForBid(bid, fromResult)
        isNewLocation = false
      }
    }

    if (isNewLocation) {
      const location = new BasisLocation(fromResult.company, fromResult.city, fromResult.state, fromResult.locationId)
      location.addBasisForBid(bid, fromResult)
      this.basisLocations.push(location)
    }

    return this.saveLocations()
  }

  @action
  async trackBasisForCBOT(dateOption: BasisDateOption, commodity: Commodity) {
    let cbotLocation = this.basisLocations.find(location => location.isCBOTLocation())

    if (!cbotLocation) {
      cbotLocation = new CBOTLocation()
      this.basisLocations.push(cbotLocation)
    }

    const [month, year] = dateOption.displayDate.split(' ')
    const monthSymbol = getSymbolForMonth(month)

    const newBasis = new Basis(cbotLocation, `${commodity.symbolPrefix}${monthSymbol}${year.slice(2)}`)

    await this.loadDataForBasises([newBasis])

    cbotLocation.addBasis(newBasis)

    return this.saveLocations()
  }

  @action
  async loadDataForBasises(basises: Basis[]) {
    const cashOrCBOTSymbols = basises.map(basis => basis.quoteSymbol)
    const basisSymbols = []

    for (const basis of basises) {
      if (basis.basisContractSymbol !== undefined) {
        basisSymbols.push(basis.basisContractSymbol)
      }
    }

    const results = await this.services.marketDataService.getQuotesForSymbols([...cashOrCBOTSymbols, ...basisSymbols])

    runInAction(() => {
      const quoteResultsBySymbol = this.quoteResultsBySymbol(results)

      for (const basis of basises) {
        const cashQuoteForBasis = quoteResultsBySymbol[basis.quoteSymbol]
        const basisQuote = basis.basisContractSymbol ? quoteResultsBySymbol[basis.basisContractSymbol] : undefined
        basis.updateFromQuotes(cashQuoteForBasis, basisQuote)
      }

      this.updateDate = new Date()
    })
  }

  quoteResultsBySymbol(results: QuoteResult[]) {
    const resultsBySymbol: { [key: string]: QuoteResult } = {}
    for (const result of results) {
      resultsBySymbol[result.symbol] = result
    }

    return resultsBySymbol
  }

  @action
  async refreshHistoricalDataForBasis(basis: Basis, dateRange: HistoricalDateRangeOption) {
    const results = await this.services.marketDataService.getHistoricalDataForSymbol(basis.quoteSymbol, dateRange)
    const symbols = [basis.quoteSymbol]

    if (basis.basisContractSymbol) {
      symbols.push(basis.basisContractSymbol)
    }

    const quoteResults = await this.services.marketDataService.getQuotesForSymbols(symbols)
    const quoteResultsBySymbol = this.quoteResultsBySymbol(quoteResults)

    runInAction(() => {
      const datapoints = []
      for (const result of results) {
        const date = moment(result.timestamp, 'YYYY-MM-DDTHH:mm:ssZ')

        const datapoint = {
          date: date.toDate(),
          priceInCents: basis.isCBOT ? result.close : result.close * 100, // cbot prices are in cents, contracts are in dollars
        }

        datapoints.push(datapoint)
      }

      basis.historicalData = datapoints
      basis.updateFromQuotes(
        quoteResultsBySymbol[basis.quoteSymbol],
        basis.basisContractSymbol ? quoteResultsBySymbol[basis.basisContractSymbol] : undefined,
      )

      if (datapoints.length > 0) {
        basis.firstPriceInCents = datapoints[0].priceInCents
      }
    })
  }

  @action
  async saveLocations() {
    if (this.rootStore.isFreeUser) {
      return
    }

    this.services.userDataService.saveBasisLocations(this.basisLocations)
  }

  @action
  subscribed() {
    this.updateDate = undefined
    this.initializeData()
  }

  @computed
  get updateDateString() {
    if (!this.updateDate) {
      return '-'
    }

    return moment(this.updateDate)
      .tz(moment.tz.guess())
      .format('hh:mm a z')
      .toLowerCase()
  }

  @computed
  get defaultLocation() {
    if (this.basisLocations.length > 0) {
      return this.basisLocations[0]
    }

    return undefined
  }
}
