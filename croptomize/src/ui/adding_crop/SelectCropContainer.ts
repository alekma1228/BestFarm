import { SelectCropScreen } from './SelectCropScreen'
import { SelectCropComponentProps } from './SelectCropProps'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'

function mapStoreProperties(rootStore: RootStore): SelectCropComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const SelectCropContainer = withStoreContext(SelectCropScreen, mapStoreProperties)

export { SelectCropContainer }
