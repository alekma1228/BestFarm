//
//  RootReducer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { combineReducers, Reducer } from 'redux'
import { AppState } from './AppState'
import { WelcomeReducer } from './WelcomeReducer'
// MARK_REDUCERS_IMPORT

const rootReducer: Reducer<AppState> = combineReducers({
  welcome: WelcomeReducer,
  // MARK_REDUCERS_LIST
})

export { rootReducer }
