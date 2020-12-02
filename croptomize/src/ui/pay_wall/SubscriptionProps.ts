//
//  src/ui/pay_wall/SubscriptionProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-23
//  Copyright © 2019 croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { UIStore } from '../../stores/UIStore'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'

export interface SubscriptionComponentProps {
  analyticsService: AnalyticsType
  uiStore: UIStore
}

export type SubscriptionProps = NavigationInjectedProps & SubscriptionComponentProps
