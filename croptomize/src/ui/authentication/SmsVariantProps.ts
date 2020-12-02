//
//  src/ui/create_account/SmsVariantProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-21
//  Copyright © 2019 croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'

export interface SmsVariantComponentProps {
  initialEmail?: string
  initialPassword?: string
  initialFirstName?: string
  initialLastName?: string
  emailError?: string
  // MARKER_COMPONENT_PROPS
}

export interface SmsVariantComponentActions {
  createAccount: (firstName: string, lastName: string, email: string, password: string) => void
  // MARKER_COMPONENT_ACTIONS
}

export type SmsVariantProps = NavigationInjectedProps & SmsVariantComponentProps & SmsVariantComponentActions
