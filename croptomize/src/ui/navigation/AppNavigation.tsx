//
//  AppNavigation.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { Store } from 'redux'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'
import { AllActions } from '../../redux/AllActions'
import { AppState } from '../../redux/AppState'
import { SplashScreen } from '../splash_screen/SplashScreen'
import { WelcomeContainer } from '../welcome/WelcomeContainer'
import { AccountStack } from './AccountNavigation'
import { AddingCropStack } from './AddingCropNavigation'
import { CroptomizeIdealFarmStack } from './CroptomizeIdealFarmNavigation'
import { AppNavigationSectionNames } from './AppNavigationSectionNames'
import { AuthStack } from '../authentication/AuthNavigation'
import { MainTabNavigation } from './MainTabNavigation'
import { kHeaderless } from './NavigationHelpers'
import { PayWallStack } from './PayWallNavigation'
import { defaultStackNavigatorConfig } from './DefaultStackNavigation'
import { DashOverScreens } from './DashboardNavigation'
import { FramesOverScreens } from './FramesNavigation'
// MARKER_APP_IMPORTS

export interface NavContext {
  store: Store<AppState, AllActions>
  analytics: AnalyticsType
  // MARKER_NAV_CONTEXT
}

// allows screens on top of the bottom tabs, as an stack
const StackOnTabs = createStackNavigator({
  [AppNavigationSectionNames.MainApp]: MainTabNavigation({ navigationOptions: { header: null } }),
  ...DashOverScreens,
  ...FramesOverScreens,
})
// similar to above, but with no transition animation
const AppStack = createSwitchNavigator({
  [AppNavigationSectionNames.TabsStack]: StackOnTabs,
  [AppNavigationSectionNames.AddingCrop]: AddingCropStack(defaultStackNavigatorConfig),
  [AppNavigationSectionNames.CroptomizeIdealFarm]: CroptomizeIdealFarmStack(defaultStackNavigatorConfig),
  [AppNavigationSectionNames.PayWall]: PayWallStack({}),
  [AppNavigationSectionNames.Account]: AccountStack(defaultStackNavigatorConfig),
})

const TopLevelNavigator = (_context: NavContext, initialRouteName?: string) =>
  createSwitchNavigator(
    {
      [AppNavigationSectionNames.Splash]: {
        screen: SplashScreen,
        navigationOptions: { ...kHeaderless, title: 'Welcome' },
      },
      [AppNavigationSectionNames.Welcome]: {
        screen: WelcomeContainer,
        navigationOptions: { ...kHeaderless, title: 'Welcome' },
      },
      [AppNavigationSectionNames.App]: AppStack,
      [AppNavigationSectionNames.Auth]: AuthStack(AppNavigationSectionNames.App, defaultStackNavigatorConfig),
      // MARKER_TOP_LEVEL_STACK_NAVIGATOR
    },
    {
      initialRouteName: initialRouteName || AppNavigationSectionNames.Welcome,
    },
  )

export { TopLevelNavigator }
