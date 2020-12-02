import { SelectBasisScreen } from './SelectBasisScreen'
import { SelectBasisComponentProps } from './SelectBasisProps'
import { RootStore } from '../../stores/RootStore'
import { withStoreContext } from '../../stores/StoreContext'

function mapStoreProperties(rootStore: RootStore): SelectBasisComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const SelectBasisContainer = withStoreContext(SelectBasisScreen, mapStoreProperties)

export { SelectBasisContainer }
