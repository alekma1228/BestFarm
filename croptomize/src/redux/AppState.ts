//
//  AppState.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { WelcomeState } from './WelcomeState'
// MARKER_APP_STATE_IMPORTS

export interface AppState {
  readonly welcome: WelcomeState
  // MARKER_APP_STATE_PROPERTIES
}
