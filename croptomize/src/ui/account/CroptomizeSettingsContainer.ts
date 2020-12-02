//
//  src/ui/welcome/WelcomeProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { RootStore } from '../../stores/RootStore'
import { withStoreContext } from '../../stores/StoreContext'
import { CroptomizeSettingsScreen } from './CroptomizeSettingsScreen'

function mapStoreProperties(rootStore: RootStore) {
  return {
    uiStore: rootStore.uiStore,
  }
}

const CroptomizeSettingsContainer = withStoreContext(CroptomizeSettingsScreen, mapStoreProperties)

export { CroptomizeSettingsContainer }
