//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'

export interface CroptomizeFrameComponentProps {
  // MARKER_COMPONENT_PROPS
}

export interface CroptomizeFrameComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type CroptomizeFrameProps = NavigationInjectedProps &
  CroptomizeFrameComponentProps &
  CroptomizeFrameComponentActions
