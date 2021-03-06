//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-19
//  Copyright © 2019 Croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'

export interface BSComingSoonComponentProps {
  // MARKER_COMPONENT_PROPS
  visible: boolean
  onDismiss: () => void
}

export interface BSComingSoonComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type BSComingSoonProps = NavigationInjectedProps & BSComingSoonComponentProps & BSComingSoonComponentActions
