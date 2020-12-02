import { MarketDataService, HistoricalDateRangeOption } from '../MarketDataService'

export class TestBarchartService implements MarketDataService {
  getGrainBids(_zipCode: string) {
    return Promise.resolve(undefined)
  }

  getGrainBidsForLocation(_locationId: number) {
    return Promise.resolve(undefined)
  }

  async getQuotesForSymbols(_symbols: string[]) {
    return Promise.resolve([])
  }

  async getQuoteForSymbol(_symbol: string) {
    return Promise.resolve(undefined)
  }

  async getHistoricalDataForSymbol(_symbol: string, _dateRange: HistoricalDateRangeOption) {
    return Promise.resolve([])
  }
}
