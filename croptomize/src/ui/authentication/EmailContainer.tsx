import { EmailScreen } from './EmailScreen'
import { EmailComponentProps } from './EmailProps'
import { RootStore } from '../../stores/RootStore'
import { withStoreContext } from '../../stores/StoreContext'

function mapStoreProperties(rootStore: RootStore): EmailComponentProps {
  return {
    basisStore: rootStore.basisStore,
    uiStore: rootStore.uiStore,
  }
}

const EmailContainer = withStoreContext(EmailScreen, mapStoreProperties)

export { EmailContainer }
