//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-27
//  Copyright © 2019 croptomize. All rights reserved.

export interface PriceCheckPayWallComponentProps {
  onSubscribe: () => void
  // MARKER_COMPONENT_PROPS
}

export interface PriceCheckPayWallComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type PriceCheckPayWallProps = PriceCheckPayWallComponentProps & PriceCheckPayWallComponentActions
