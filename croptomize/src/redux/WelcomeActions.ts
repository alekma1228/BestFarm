//
//  WelcomeActions.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { AllActionTypes, AllActionCategories } from './AllActions'

interface WelcomeAction {
  category: AllActionCategories.WELCOME
}

interface BootstrapAction extends WelcomeAction {
  type: AllActionTypes.WELCOME_BOOT_STRAP
}

export type WelcomeActions = BootstrapAction
