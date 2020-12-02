//
//  WelcomeReducer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { WelcomeState } from './WelcomeState'
import { AllActions, AllActionCategories } from './AllActions'

const initialWelcomeState: WelcomeState = {}

export function WelcomeReducer(state = initialWelcomeState, action: AllActions): WelcomeState {
  switch (action.category) {
    case AllActionCategories.WELCOME:
      switch (action.type) {
        default:
          return state
      }
    default:
      return state
  }
}
