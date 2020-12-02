//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'

export interface EditFieldComponentProps {
  // MARKER_COMPONENT_PROPS
}

export interface EditFieldComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type EditFieldProps = NavigationInjectedProps & EditFieldComponentProps & EditFieldComponentActions
