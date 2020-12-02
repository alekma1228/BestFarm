import { CroptomizeIdealFarmScreen } from './CroptomizeIdealFarmScreen'
import { CroptomizeIdealFarmComponentProps } from './CroptomizeIdealFarmProps'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'

function mapStoreProperties(rootStore: RootStore): CroptomizeIdealFarmComponentProps {
  return {
    analyticsService: rootStore.analyticsService,
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const CroptonizeIdealFarmContainer = withStoreContext(CroptomizeIdealFarmScreen, mapStoreProperties)

export { CroptonizeIdealFarmContainer }
