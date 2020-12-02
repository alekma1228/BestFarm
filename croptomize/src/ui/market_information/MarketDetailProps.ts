//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'

export interface MarketDetailComponentProps {
  analyticsService: AnalyticsType
  basisStore: BasisStore
  uiStore: UIStore
}

export type MarketDetailProps = NavigationInjectedProps & MarketDetailComponentProps
