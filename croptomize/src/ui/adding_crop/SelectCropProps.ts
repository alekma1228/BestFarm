//
//  src/ui/adding_crop/SelectCropProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-23
//  Copyright © 2019 croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'

export interface SelectCropComponentProps {
  analyticsService: AnalyticsType
  basisStore: BasisStore
  uiStore: UIStore
  // MARKER_COMPONENT_PROPS
}

export type SelectCropProps = NavigationInjectedProps & SelectCropComponentProps
