//
//  AuthNavigation.ts
//
//  Created by Modern Logic
//  Copyright © 2019 croptomize. All Rights Reserved.

import { StackNavigatorConfig, createSwitchNavigator } from 'react-navigation'

import { FullNameContainer } from '../authentication/FullNameContainer'
import { PasswordContainer } from '../authentication/PasswordContainer'
import { SmsVariantContainer } from '../authentication/SmsVariantContainer'
import { SmsVerificationContainer } from '../authentication/SmsVerificationContainer'
import { AuthScreenNames, LoggedInScreenNameKey } from './AuthScreenNames'
import { AuthRoot } from './AuthRoot'
import { EmailContainer } from '../authentication/EmailContainer'
import { LoginScreen } from './LoginScreen'

const kHeaderless = {
  header: null,
  headerBackTitle: null,
  gesturesEnabled: false,
  headerTransparent: false,
  headerTitleStyle: null,
  // headerStyle: null,
  headerTintColor: null,
}

export const setupAuthScreens = (loggedInScreenName: string) => {
  return {
    [AuthScreenNames.AuthRoot]: {
      screen: AuthRoot,
      navigationOptions: { ...kHeaderless, title: '' },
      params: {
        [LoggedInScreenNameKey]: loggedInScreenName,
      },
    },
    [AuthScreenNames.SmsVariant]: {
      screen: SmsVariantContainer,
      navigationOptions: { title: 'SMS Variant' },
    },
    [AuthScreenNames.SmsVerification]: {
      screen: SmsVerificationContainer,
      navigationOptions: { title: 'SMS Verification' },
    },
    [AuthScreenNames.FullName]: {
      screen: FullNameContainer,
      navigationOptions: { title: 'Full Name' },
    },
    [AuthScreenNames.Password]: {
      screen: PasswordContainer,
      navigationOptions: { title: 'Password' },
    },
    [AuthScreenNames.Email]: {
      screen: EmailContainer,
      navigationOptions: { ...kHeaderless, title: '' },
    },
    [AuthScreenNames.Login]: {
      screen: LoginScreen,
      navigationOptions: { ...kHeaderless, title: '' },
    },
  }
}

export const AuthStack = (loggedInScreenName: string, config: Partial<StackNavigatorConfig> = {}) =>
  createSwitchNavigator(setupAuthScreens(loggedInScreenName), {
    initialRouteName: AuthScreenNames.AuthRoot,
    ...config,
  })
