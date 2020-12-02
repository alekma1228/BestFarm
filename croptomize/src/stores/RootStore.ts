//
//  RootStore.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-08-30
//  Copyright © 2019 Connect the Grey. All Rights Reserved.

import { observable } from 'mobx'
import { AnalyticsType } from '../analytics/MoLoAnalytics'
import { ServiceRegistry } from '../services/ServiceRegistry'
import { BasisStore } from './BasisStore'
import { UIStore } from './UIStore'
import { HeaderStore } from './HeaderStore'
import { DashboardStore } from './DashboardStore'

export class RootStore {
  public analyticsService: AnalyticsType
  public basisStore: BasisStore
  public uiStore: UIStore
  public headerStore: HeaderStore
  public dashboardStore: DashboardStore
  @observable isFreeUser = false

  constructor(services: ServiceRegistry) {
    this.basisStore = new BasisStore(services, this)
    this.uiStore = new UIStore(services, this)
    this.headerStore = new HeaderStore()
    this.dashboardStore = new DashboardStore(services)
    this.analyticsService = services.analyticsService

    if (this.basisStore.defaultLocation) {
      this.uiStore.selectBasisLocation(this.basisStore.defaultLocation)
    }
    // Persisted data
    this.hydrate()
  }

  private hydrate() {
    // TODO kinda complicated
  }
}
