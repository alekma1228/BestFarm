//
//  src/ui/adding_crop/SelectActiveMonthProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-23
//  Copyright © 2019 croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'

export interface SelectActiveMonthComponentProps {
  analyticsService: AnalyticsType
  basisStore: BasisStore
  uiStore: UIStore
  // MARKER_COMPONENT_PROPS
}

export type SelectActiveMonthProps = NavigationInjectedProps & SelectActiveMonthComponentProps
