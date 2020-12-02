//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { NewsComponentProps, NewsScreen } from './NewsScreen'
import { observer } from 'mobx-react'

function mapStoreProperties(rootStore: RootStore): NewsComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const NewsContainer = withStoreContext(observer(NewsScreen), mapStoreProperties)

export { NewsContainer }
