import React from 'react'
import { NavigationScreenProp, NavigationRoute } from 'react-navigation'
import { BackButton } from './BackButton'
import { useRootStore } from '../../stores/StoreContext'
import { observer } from 'mobx-react'

interface StoreAwareBackButtonProps {
  navigation: NavigationScreenProp<NavigationRoute>
  defaultReturnScreen: string
}

export const StoreAwareBackButton = observer((props: StoreAwareBackButtonProps) => {
  const rootStore = useRootStore()
  const returnToScreen = rootStore.uiStore.backButtonReturnToScreen ?? props.defaultReturnScreen

  return (
    <BackButton
      onPress={() => {
        props.navigation.navigate(returnToScreen)
      }}
    />
  )
})
