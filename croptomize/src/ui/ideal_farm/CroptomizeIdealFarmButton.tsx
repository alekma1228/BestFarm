import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AppColors } from '../styles/AppStyles'
import { useRootStore } from '../../stores/StoreContext'
import { CroptomizeIdealFarmScreenNames } from '../navigation/CroptomizeIdealFarmScreenNames'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

interface CroptomizeIdealFarmButtonProps {
  returnToScreen: string
}

export const CroptomizeIdealFarmButton = withNavigation(
  (props: CroptomizeIdealFarmButtonProps & NavigationInjectedProps) => {
    const rootStore = useRootStore()
    if (rootStore.uiStore.isFreeUser) {
      return null
    }
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          rootStore.uiStore.backButtonReturnToScreen = props.returnToScreen
          props.navigation.navigate(CroptomizeIdealFarmScreenNames.IdealFarm)
        }}
      >
        <Image style={styles.icon} source={require('../../../assets/farm-light.png')} />
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  icon: {
    tintColor: AppColors.navy,
  },
})
