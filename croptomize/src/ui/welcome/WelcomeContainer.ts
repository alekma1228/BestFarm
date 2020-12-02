//
//  src/ui/welcome/WelcomeProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { RootStore } from '../../stores/RootStore'
import { withStoreContext } from '../../stores/StoreContext'
import { WelcomeScreen } from './WelcomeScreen'

function mapStoreProperties(rootStore: RootStore) {
  return {
    uiStore: rootStore.uiStore,
  }
}

const WelcomeContainer = withStoreContext(WelcomeScreen, mapStoreProperties)

export { WelcomeContainer }
