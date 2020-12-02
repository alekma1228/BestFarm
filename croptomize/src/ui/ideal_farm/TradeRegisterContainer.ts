import { TradeRegisterScreen } from './TradeRegisterScreen'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { TradeRegisterComponentProps } from './TradeRegisterProps'

function mapStoreProperties(rootStore: RootStore): TradeRegisterComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const TradeRegisterContainer = withStoreContext(TradeRegisterScreen, mapStoreProperties)

export { TradeRegisterContainer }
