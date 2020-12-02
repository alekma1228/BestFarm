//
//  CreateStore.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { createStore, applyMiddleware, Reducer, Action, Store } from 'redux'
import { createEpicMiddleware, Epic } from 'redux-observable'
// MARKER_IMPORTS

function createStoreWithMiddleware<AppState, AllActions extends Action, AppServices>(
  dependencies: AppServices,
  rootEpic: Epic<AllActions, AllActions, AppState, AppServices>,
  rootReducer: Reducer<AppState>,
): Store<AppState, AllActions> {
  const epicMiddleware = createEpicMiddleware<AllActions, AllActions, AppState, AppServices>({
    dependencies: dependencies,
  })
  const store = createStore<AppState, AllActions, any, any>(rootReducer, applyMiddleware(epicMiddleware))

  epicMiddleware.run(rootEpic)

  return store
}

export { createStoreWithMiddleware }
