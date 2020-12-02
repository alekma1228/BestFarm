//
//  PriceCheck.ts
//  Croptomize
//
//  Created by Modern Logic
//  Copyright © 2019 croptomize. All Rights Reserved.

import React from 'react'
import { createStackNavigator, StackNavigatorConfig, NavigationScreenConfigProps } from 'react-navigation'

import { FarmScreenNames, PostTitleKey } from './FarmScreenNames'
import { NewsContainer } from '../news/NewsContainer'
// import { NewsFilterButton } from '../news/NewsFilterButton'
import { NewsWebContainer } from '../news/NewsWebContainer'
import { AccountDetailButton } from '../account/AccountDetailButton'

const farmNavigationOptions = ({}: NavigationScreenConfigProps) => {
  return {
    title: 'News & Articles',
    headerLeft: null, // <NewsFilterButton onPress={() => navigation.navigate(FarmScreenNames.News)} />,
    headerRight: <AccountDetailButton returnToScreen={FarmScreenNames.News} />,
  }
}

const webNavigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
  return {
    title: navigation.getParam(PostTitleKey, ''),
  }
}

export const PriceCheckScreens = {
  [FarmScreenNames.News]: {
    screen: NewsContainer,
    navigationOptions: farmNavigationOptions,
  },
  [FarmScreenNames.Web]: {
    screen: NewsWebContainer,
    navigationOptions: webNavigationOptions,
  },
  // MARKER_INSERT_SCREENS_HERE
}

export const FarmStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(PriceCheckScreens, {
    initialRouteName: FarmScreenNames.News,
    ...config,
  })
