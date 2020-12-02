//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-15
//  Copyright © 2019 Croptomize. All rights reserved.

import { PriceCheckScreen } from './PriceCheckScreen'
import { PriceCheckComponentProps } from './PriceCheckProps'
import { RootStore } from '../../stores/RootStore'
import { withStoreContext } from '../../stores/StoreContext'

function mapStoreProperties(rootStore: RootStore): PriceCheckComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const PriceCheckContainer = withStoreContext(PriceCheckScreen, mapStoreProperties)

export { PriceCheckContainer }
