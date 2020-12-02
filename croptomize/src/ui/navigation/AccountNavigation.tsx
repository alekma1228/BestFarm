//
//  AddingCrop.ts
//  Croptomize
//
//  Created by Modern Logic
//  Copyright © 2019 croptomize. All Rights Reserved.

import React from 'react'
import { createStackNavigator, StackNavigatorConfig, NavigationScreenConfigProps } from 'react-navigation'
import { CroptomizeSettingsContainer } from '../account/CroptomizeSettingsContainer'
import { EditFieldContainer } from '../account/EditFieldContainer'
import { MarketInformationScreenNames } from './MarketInformationScreenNames'
import { StoreAwareBackButton } from '../components/StoreAwareBackButton'

export enum AccountScreenNames {
  AccountSettings = 'accountSettings',
  EditField = 'editField',
}

const accountSettingsNavigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
  return {
    title: 'Croptomize Settings',
    headerLeft: (
      <StoreAwareBackButton navigation={navigation} defaultReturnScreen={MarketInformationScreenNames.MarketFeed} />
    ),
  }
}

export const AccountScreens = {
  [AccountScreenNames.AccountSettings]: {
    screen: CroptomizeSettingsContainer,
    navigationOptions: accountSettingsNavigationOptions,
  },
  [AccountScreenNames.EditField]: {
    screen: EditFieldContainer,
    navigationOptions: { title: 'Edit' },
  },
}

export const AccountStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(AccountScreens, {
    initialRouteName: AccountScreenNames.AccountSettings,
    ...config,
  })
