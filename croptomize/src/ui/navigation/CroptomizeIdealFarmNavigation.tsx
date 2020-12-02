import React from 'react'
import { createStackNavigator, StackNavigatorConfig, NavigationScreenConfigProps } from 'react-navigation'

import { CroptonizeIdealFarmContainer } from '../ideal_farm/CroptomizeIdealFramContainer'
import { TradeRegisterContainer } from '../ideal_farm/TradeRegisterContainer'
import { BackButton } from '../components/BackButton'
import { PriceCheckScreenNames } from './PriceCheckScreenNames'
import { CroptomizeIdealFarmScreenNames } from './CroptomizeIdealFarmScreenNames'
import { TradeRegisterButton } from '../ideal_farm/TradeRegisgerButton'

const selectNavigationOptions = (title: string, isTradeRegisterScreen = false) => {
  return ({ navigation }: NavigationScreenConfigProps) => {
    const values: any = {
      title: title,
    }

    if (isTradeRegisterScreen) {
      values.headerLeft = <BackButton onPress={() => navigation.navigate(CroptomizeIdealFarmScreenNames.IdealFarm)} />
    } else {
      values.headerLeft = <BackButton onPress={() => navigation.navigate(PriceCheckScreenNames.PriceCheck)} />
      values.headerRight = <TradeRegisterButton returnToScreen={CroptomizeIdealFarmScreenNames.IdealFarm} />
    }

    return values
  }
}

export const CroptomizeIdealFarmScreens = {
  [CroptomizeIdealFarmScreenNames.IdealFarm]: {
    screen: CroptonizeIdealFarmContainer,
    navigationOptions: selectNavigationOptions('Croptomize Ideal Farm'),
  },
  [CroptomizeIdealFarmScreenNames.TradeRegister]: {
    screen: TradeRegisterContainer,
    navigationOptions: selectNavigationOptions('Trade Register', true),
  },
}

export const CroptomizeIdealFarmStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(CroptomizeIdealFarmScreens, {
    initialRouteName: CroptomizeIdealFarmScreenNames.IdealFarm,
    ...config,
  })
