//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { NewsWebComponentProps, NewsWebScreen } from './NewsWebScreen'
import { observer } from 'mobx-react'

function mapStoreProperties(rootStore: RootStore): NewsWebComponentProps {
  return {
    uiStore: rootStore.uiStore,
  }
}

const NewsWebContainer = withStoreContext(observer(NewsWebScreen), mapStoreProperties)

export { NewsWebContainer }
