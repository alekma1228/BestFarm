import { BarchartService } from './runtime_services/BarChartService'
import { TestBarchartService } from './test_services/TestBarChartService'
import { TestUserDataService } from './test_services/TestUserDataService'
import { ServiceRegistry } from './ServiceRegistry'
import { LiveUserDataService } from './runtime_services/LiveUserDataService'
import { LiveCroptomizeService } from './runtime_services/LiveCroptomizeService'
import { TestCroptomizeService } from './test_services/TestCroptomizeService'
import { Analytics } from '../analytics/MoLoAnalytics'
import { MockAnalyticsService } from '../analytics/MockAnalyticsService'

interface ServiceOptions {
  runtimeServices: ServiceRegistry
  testServices: ServiceRegistry
}

export const serviceOptions: ServiceOptions = {
  runtimeServices: {
    marketDataService: new BarchartService(),
    userDataService: new LiveUserDataService(),
    croptomizeService: new LiveCroptomizeService(),
    analyticsService: Analytics,
  },
  testServices: {
    marketDataService: new TestBarchartService(),
    userDataService: new TestUserDataService(),
    croptomizeService: new TestCroptomizeService(),
    analyticsService: new MockAnalyticsService(),
  },
}
