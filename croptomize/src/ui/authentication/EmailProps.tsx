//
//  src/ui/create_account/SmsVerificationProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-21
//  Copyright © 2019 croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'

export interface EmailComponentProps {
  uiStore: UIStore
  basisStore: BasisStore
  // MARKER_COMPONENT_PROPS
}

export interface EmailComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type EmailProps = NavigationInjectedProps & EmailComponentProps & EmailComponentActions
