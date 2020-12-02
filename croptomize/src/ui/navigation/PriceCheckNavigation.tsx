//
//  PriceCheck.ts
//  Croptomize
//
//  Created by Modern Logic
//  Copyright © 2019 croptomize. All Rights Reserved.

import React from 'react'
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation'

import { CroptomizeFrameContainer } from '../price_check/CroptomizeFrameContainer'
import { PriceCheckContainer } from '../price_check/PriceCheckContainer'
import { PriceCalculationContainer } from '../price_check/PriceCalculationContainer'
import { kHeaderless } from './NavigationHelpers'
import { PriceCheckScreenNames } from './PriceCheckScreenNames'
import { AccountDetailButton } from '../account/AccountDetailButton'
import { CroptomizeIdealFarmButton } from '../ideal_farm/CroptomizeIdealFarmButton'

const priceCheckerNavigationOptions = () => {
  return {
    title: 'Croptomize Intelligence',
    headerRight: <AccountDetailButton returnToScreen={PriceCheckScreenNames.PriceCheck} />,
    headerLeft: <CroptomizeIdealFarmButton returnToScreen={PriceCheckScreenNames.PriceCheck} />,
  }
}

export const PriceCheckScreens = {
  [PriceCheckScreenNames.CroptomizeFrame]: {
    screen: CroptomizeFrameContainer,
    navigationOptions: { title: 'Croptomize Frame' },
  },
  [PriceCheckScreenNames.PriceCheck]: {
    screen: PriceCheckContainer,
    navigationOptions: priceCheckerNavigationOptions,
  },
  [PriceCheckScreenNames.PriceCalculation]: {
    screen: PriceCalculationContainer,
    navigationOptions: { ...kHeaderless, title: 'Price Calculation' },
  },
  // MARKER_INSERT_SCREENS_HERE
}

export const PriceCheckStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(PriceCheckScreens, {
    initialRouteName: PriceCheckScreenNames.PriceCheck,
    ...config,
  })
