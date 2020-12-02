import { NavigationInjectedProps } from 'react-navigation'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'

export interface CroptomizeIdealFarmComponentProps {
  analyticsService: AnalyticsType
  basisStore: BasisStore
  uiStore: UIStore
  // MARKER_COMPONENT_PROPS
}

export type CroptomizeIdealFarmProps = NavigationInjectedProps & CroptomizeIdealFarmComponentProps
