//
//  src/ui/create_account/SmsVerificationProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-21
//  Copyright © 2019 croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'

export interface SmsVerificationComponentProps {
  phoneNumber: string
  // MARKER_COMPONENT_PROPS
}

export interface SmsVerificationComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type SmsVerificationProps = NavigationInjectedProps &
  SmsVerificationComponentProps &
  SmsVerificationComponentActions
