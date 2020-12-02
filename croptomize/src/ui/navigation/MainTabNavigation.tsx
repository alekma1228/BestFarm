import React from 'react'
import { Image } from 'react-native'
import { BottomTabNavigatorConfig, createBottomTabNavigator } from 'react-navigation'
import { defaultStackNavigatorConfig } from './DefaultStackNavigation'
import { MarketInformationStack } from './MarketInformationNavigation'
import { MainTabNames } from './MainTabNames'
import { PriceCheckStack } from './PriceCheckNavigation'
import { AppColors } from '../styles/AppStyles'
import { FarmStack } from './FarmNavigation'
// import { FramesStack } from './FramesNavigation'
import { DashboardStack } from './DashboardNavigation'

const mainNavigationOptions: BottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const routeName = navigation.state.routeName as MainTabNames

      if (!tintColor) {
        tintColor = AppColors.highlightColor
      }

      switch (routeName) {
        case MainTabNames.MarketInformation:
          return (
            <Image style={{ width: 35, height: 35, tintColor }} source={require('../../../assets/market-view.png')} />
          )
        case MainTabNames.PriceCheck:
          return (
            <Image
              source={require('../../../assets/croptomize-intelligence-icon.png')}
              style={{ width: 35, height: 35, tintColor }}
            />
          )
        // case MainTabNames.Frames:
        //   return <Image source={require('../../../assets/frames-icon.png')} style={{ tintColor }} />
        case MainTabNames.Farm:
          return (
            <Image source={require('../../../assets/news-icon.png')} style={{ width: 35, height: 35, tintColor }} />
          )
        case MainTabNames.Dashboard:
          return (
            <Image
              source={require('../../../assets/croptomize-farm.png')}
              style={{ width: 35, height: 35, tintColor }}
            />
          )
      }
    },
    // tabBarLabel: () => null,
  }),
  tabBarOptions: {
    activeTintColor: AppColors.highlightColor,
    inactiveTintColor: AppColors.darkTextColor,
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: AppColors.lightCream,
    },
  },
  // fixes initial stagger on farm tabs first load
  // but once the app grows it might make it slower.
  lazy: false,
}

export const MainTabNavigation = (config: Partial<BottomTabNavigatorConfig> = {}) =>
  createBottomTabNavigator(
    {
      [MainTabNames.MarketInformation]: MarketInformationStack(defaultStackNavigatorConfig),
      [MainTabNames.PriceCheck]: PriceCheckStack(defaultStackNavigatorConfig),
      // [MainTabNames.Frames]: FramesStack(defaultStackNavigatorConfig),
      [MainTabNames.Dashboard]: DashboardStack(defaultStackNavigatorConfig),
      [MainTabNames.Farm]: FarmStack(defaultStackNavigatorConfig),
    },
    {
      ...(mainNavigationOptions as any),
      ...config,
    },
  )
