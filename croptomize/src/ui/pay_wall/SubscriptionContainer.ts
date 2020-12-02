//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-15
//  Copyright © 2019 Croptomize. All rights reserved.

import { SubscriptionScreen } from './SubscriptionScreen'
import { RootStore } from '../../stores/RootStore'
import { withStoreContext } from '../../stores/StoreContext'
import { SubscriptionComponentProps } from './SubscriptionProps'

function mapStoreProperties(rootStore: RootStore): SubscriptionComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    uiStore: rootStore.uiStore,
  }
}

const SubscriptionContainer = withStoreContext(SubscriptionScreen, mapStoreProperties)

export { SubscriptionContainer }
