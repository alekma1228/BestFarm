//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { MarketDetailScreen } from './MarketDetailScreen'
import { MarketDetailComponentProps } from './MarketDetailProps'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'

function mapStoreProperties(rootStore: RootStore): MarketDetailComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const MarketDetailContainer = withStoreContext(MarketDetailScreen, mapStoreProperties)

export { MarketDetailContainer }
