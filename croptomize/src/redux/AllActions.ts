//
//  AllActions.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { WelcomeActions } from './WelcomeActions'
// MARKER_IMPORTS

export enum AllActionCategories {
  NOOP = 'NOOP',
  WELCOME = 'WELCOME',

  // MARKER_ALL_ACTION_CATEGORIES
}

export enum AllActionTypes {
  // MARKER_NOOP_ACTION_TYPES
  NOOP_NOOP = 'NOOP/NOOP',

  // MARKER_WELCOME_ACTION_TYPES
  WELCOME_BOOT_STRAP = 'WELCOME/BOOT_STRAP',

  // MARKER_NEW_ACTION_TYPES
}

type NoOp = { category: AllActionCategories.NOOP; type: AllActionTypes.NOOP_NOOP }

export type AllActions = NoOp | WelcomeActions
// MARKER_ALL_ACTIONS
