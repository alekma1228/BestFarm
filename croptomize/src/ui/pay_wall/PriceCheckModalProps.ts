//
//  src/ui/pay_wall/PriceCheckModalProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-23
//  Copyright © 2019 croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'

export interface PriceCheckModalComponentProps {
  // MARKER_COMPONENT_PROPS
}

export interface PriceCheckModalComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type PriceCheckModalProps = NavigationInjectedProps &
  PriceCheckModalComponentProps &
  PriceCheckModalComponentActions
