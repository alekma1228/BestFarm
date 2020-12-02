import { MarketDataService, HistoricalDateRangeOption } from '../MarketDataService'
import moment from 'moment'

const API_KEY = '7b1925642d3c667c34d19cb1fc255299'

interface ServiceStatus {
  code: number
  message: string
}

interface ServiceResult {
  status: ServiceStatus
  results: any[]
}

export class BarchartService implements MarketDataService {
  async getGrainBids(zipCode: string) {
    const result = await this.makeRequest('getGrainBids', `zipCode=${zipCode}&getAllBids=true`)

    if (result && result['status'] && result['status']['code'] === 200) {
      return result['results']
    }

    return undefined
  }

  async getGrainBidsForLocation(locationId: number) {
    const result = await this.makeRequest('getGrainBids', `locationId=${locationId}&getAllBids=true`)

    if (result && result['status'] && result['status']['code'] === 200) {
      return result['results'].length > 0 ? result['results'][0] : undefined
    }

    return undefined
  }

  async getQuotesForSymbols(symbols: string[]) {
    const result = await this.makeRequest('getQuote', `symbols=${symbols.join(',')}`)

    if (result && result['status'] && result['status']['code'] === 200) {
      return result['results']
    }

    return []
  }

  async getQuoteForSymbol(symbol: string) {
    const result = await this.getQuotesForSymbols([symbol])

    if (result && result.length > 0) {
      return result[0]
    }

    return undefined
  }

  async getHistoricalDataForSymbol(symbol: string, dateRange: HistoricalDateRangeOption) {
    const params = paramsForDateRange(dateRange)

    let interval = ''
    if (params.interval) {
      interval = `&interval=${params.interval}`
    }

    const queryString = `symbol=${symbol}&type=${params.type}&startDate=${params.date.format('YYYY-MM-DD')}${interval}`
    const result = await this.makeRequest('getHistory', queryString)
    console.log('LOADING DATA FOR: ', queryString)

    if (result && result['status'] && result['status']['code'] === 200) {
      return result['results']
    }

    return []
  }

  private async makeRequest(serviceName: string, parameterString: string): Promise<ServiceResult | undefined> {
    try {
      const response = await fetch(
        `https://ondemand.websol.barchart.com/${serviceName}.json?apikey=${API_KEY}&${parameterString}`,
      )

      if (response.ok) {
        return response.json()
      }
    } catch (error) {
      console.log(
        `Error while fetching data from marketService ${serviceName} with parameters: ${parameterString}`,
        error,
      )
    }

    return undefined
  }
}

interface HistoricalParams {
  date: moment.Moment
  type: string
  interval?: number
}

function paramsForDateRange(dateRange: HistoricalDateRangeOption): HistoricalParams {
  switch (dateRange) {
    case HistoricalDateRangeOption.Day:
      return {
        date: moment().subtract(1, 'day'),
        type: 'minutes',
        interval: 60,
      }
    case HistoricalDateRangeOption.Week:
      return {
        date: moment().subtract(1, 'week'),
        type: 'minutes',
        interval: 60,
      }
    case HistoricalDateRangeOption.Month:
      return {
        date: moment().subtract(1, 'month'),
        type: 'daily',
      }
    case HistoricalDateRangeOption.ThreeMonths:
      return {
        date: moment().subtract(3, 'month'),
        type: 'daily',
      }
    case HistoricalDateRangeOption.Year:
      return {
        date: moment().subtract(1, 'year'),
        type: 'daily',
      }
    default:
      return {
        date: moment().subtract(1, 'month'),
        type: 'daily',
      }
  }
}
