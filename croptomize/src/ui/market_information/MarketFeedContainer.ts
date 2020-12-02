//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { MarketFeedScreen } from './MarketFeedScreen'

function mapStoreProperties(rootStore: RootStore) {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const MarketFeedContainer = withStoreContext(MarketFeedScreen, mapStoreProperties)

export { MarketFeedContainer }
