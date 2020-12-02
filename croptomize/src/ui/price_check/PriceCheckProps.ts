//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-15
//  Copyright © 2019 Croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'

export interface PriceCheckComponentProps {
  analyticsService: AnalyticsType
  basisStore: BasisStore
  uiStore: UIStore
}

export type PriceCheckProps = NavigationInjectedProps & PriceCheckComponentProps
