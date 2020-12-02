//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { UIStore } from '../../stores/UIStore'

export interface CroptomizeSettingsComponentProps {
  uiStore: UIStore
  // MARKER_COMPONENT_PROPS
}

export interface CroptomizeSettingsComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type CroptomizeSettingsProps = NavigationInjectedProps &
  CroptomizeSettingsComponentProps &
  CroptomizeSettingsComponentActions
