import { NavigationInjectedProps } from 'react-navigation'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'

export interface TradeRegisterComponentProps {
  analyticsService: AnalyticsType
  basisStore: BasisStore
  uiStore: UIStore
  // MARKER_COMPONENT_PROPS
}

export type TradeRegisterProps = NavigationInjectedProps & TradeRegisterComponentProps
