import React from 'react'
import Header from '../components/Header'
import { FramesScreenNames } from '../frames/FramesScreenNames'
import { StackNavigatorConfig, createStackNavigator } from 'react-navigation'
import FramesHomeScreen from '../frames/FramesHomeScreen'
import GetNowScreen from '../frames/GetNowScreen'
import FramesPurchaseScreen from '../frames/FramePurchaseScreen'
import { AppColors } from '../styles/AppStyles'

export const FramesScreens = {
  [FramesScreenNames.Main]: {
    screen: FramesHomeScreen,
    navigationOptions: {
      header: (props: any) => <Header {...props}></Header>,
    },
  },
  [FramesScreenNames.GetNow]: {
    screen: GetNowScreen,
    navigationOptions: {
      header: (props: any) => <Header {...props} title="Croptomize Frames"></Header>,
    },
  },
}
export const FramesOverScreens = {
  [FramesScreenNames.Purchase]: {
    screen: FramesPurchaseScreen,
    navigationOptions: {
      header: (props: any) => <Header {...props} backgroundColor={AppColors.navy}></Header>,
    },
  },
}

export const FramesStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(FramesScreens, {
    initialRouteName: FramesScreenNames.GetNow,
    ...config,
  })
