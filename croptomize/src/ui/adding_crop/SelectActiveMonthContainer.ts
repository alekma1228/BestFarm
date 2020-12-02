import { SelectActiveMonthScreen } from './SelectActiveMonthScreen'
import { SelectActiveMonthComponentProps } from './SelectActiveMonthProps'
import { RootStore } from '../../stores/RootStore'
import { withStoreContext } from '../../stores/StoreContext'

function mapStoreProperties(rootStore: RootStore): SelectActiveMonthComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const SelectActiveMonthContainer = withStoreContext(SelectActiveMonthScreen, mapStoreProperties)

export { SelectActiveMonthContainer }
