import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../styles/AppStyles'
import { useRootStore } from '../../stores/StoreContext'
import { AccountScreenNames } from '../navigation/AccountNavigation'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

export const AccountSettingsNavigateToKey = 'NavigateTo'

interface AccountDetailButtonProps {
  returnToScreen: string
}

export const AccountDetailButton = withNavigation((props: AccountDetailButtonProps & NavigationInjectedProps) => {
  const rootStore = useRootStore()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        rootStore.uiStore.backButtonReturnToScreen = props.returnToScreen
        props.navigation.navigate(AccountScreenNames.AccountSettings)
      }}
    >
      <Image style={styles.icon} source={require('../../../assets/settings-gear.png')} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  icon: {
    tintColor: AppColors.navy,
  },
})
