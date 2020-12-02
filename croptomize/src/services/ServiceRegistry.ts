import { MarketDataService } from './MarketDataService'
import { UserDataService } from './UserDataService'
import { CroptomizeService } from './CroptomizeService'
import { AnalyticsType } from '../analytics/MoLoAnalytics'

export interface ServiceRegistry {
  marketDataService: MarketDataService
  userDataService: UserDataService
  croptomizeService: CroptomizeService
  analyticsService: AnalyticsType
}
