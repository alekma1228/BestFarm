//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-27
//  Copyright © 2019 croptomize. All rights reserved.

export interface SelectActiveMonthPayWallComponentProps {
  onSubscribe: () => void
  // MARKER_COMPONENT_PROPS
}

export interface SelectActiveMonthPayWallComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type SelectActiveMonthPayWallProps = SelectActiveMonthPayWallComponentProps &
  SelectActiveMonthPayWallComponentActions
