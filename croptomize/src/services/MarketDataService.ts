export interface GrainBid {
  id: number
  commodity: string
  symbol: string
  basismonth: string
  timestamp: number
  cashprice: string
  basis: string
  rawchange: number
  pctchange: string
  basisSymbol: string
  cashPriceSymbol: string
  delivery_start: string
  delivery_end: string
  customer_commodity_id: string
  as_of: string
}

export interface GrainBidsResult {
  bids: GrainBid[]
  distance: string
  company: string
  locationId: number
  city: string
  state: string
  basisTimestampRaw: number
}

export interface QuoteResult {
  symbol: string
  tradeTimestamp: string
  lastPrice: number // in cents
}

export interface HistoricalDataResult {
  symbol: string
  tradingDay: string
  timestamp: string
  close: number
}

export enum HistoricalDateRangeOption {
  Day = '1D',
  Week = '1W',
  Month = '1M',
  ThreeMonths = '3M',
  Year = '1Y',
}

export interface MarketDataService {
  getGrainBids: (zipCode: string) => Promise<GrainBidsResult[] | undefined>
  getGrainBidsForLocation: (locationId: number) => Promise<GrainBidsResult | undefined>
  getQuotesForSymbols: (symbols: string[]) => Promise<QuoteResult[]>
  getQuoteForSymbol: (symbol: string) => Promise<QuoteResult | undefined>
  getHistoricalDataForSymbol: (symbol: string, dateRange: HistoricalDateRangeOption) => Promise<HistoricalDataResult[]>
}
