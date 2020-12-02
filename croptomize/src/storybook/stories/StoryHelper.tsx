//
//  StoryHelper.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All Rights Reserved.

import React, { ReactNode } from 'react'
import { Store } from 'redux'
import {
  createStackNavigator,
  createAppContainer,
  NavigationContainer,
  NavigationRouteConfig,
  StackNavigatorConfig,
  createBottomTabNavigator,
} from 'react-navigation'
import { Provider } from 'react-redux'
import { createStoreWithMiddleware } from '../../redux/CreateStore'
import { AllActions } from '../../redux/AllActions'
import { AppState } from '../../redux/AppState'
import Icon from 'react-native-vector-icons/FontAwesome'
import { RootEpic } from '../../redux/RootEpic'
import { rootReducer } from '../../redux/RootReducer'
import { MockAnalyticsService } from '../../analytics/MockAnalyticsService'

export interface StoryHelperProps {
  views: { [key: string]: ReactNode }
  defaultView: string
  config?: Partial<StackNavigatorConfig>
  initialActions?: AllActions[]
}

export class StoryHelper extends React.Component<StoryHelperProps, {}> {
  private store: Store<AppState, AllActions>
  private testSwitchNav: NavigationContainer
  constructor(props: StoryHelperProps) {
    super(props)
    const analytics = new MockAnalyticsService()
    const store = createStoreWithMiddleware({ analytics }, RootEpic, rootReducer)
    this.store = store
    const initialActions = props.initialActions
    if (initialActions) {
      initialActions.forEach(action => store.dispatch(action))
    }
    const testSwitchNav = createStackNavigator(props.views, { initialRouteName: props.defaultView, ...props.config })
    this.testSwitchNav = testSwitchNav
  }
  render() {
    const TopLevelNavWithStore = createAppContainer(this.testSwitchNav)
    return (
      <Provider store={this.store}>
        <TopLevelNavWithStore />
      </Provider>
    )
  }
}

export class TabBarHost extends React.Component<StoryHelperProps, {}> {
  private store: Store<AppState, AllActions>
  private testSwitchNav: NavigationContainer
  constructor(props: StoryHelperProps) {
    super(props)
    const analytics = new MockAnalyticsService()
    const store = createStoreWithMiddleware({ analytics }, RootEpic, rootReducer)
    this.store = store
    const initialActions = props.initialActions
    if (initialActions) {
      initialActions.forEach(action => store.dispatch(action))
    }
    const testSwitchNav = createBottomTabNavigator(
      {
        default: {
          screen: createStackNavigator(props.views, { initialRouteName: props.defaultView, ...props.config }),
          navigationOptions: {
            tabBarOptions: {
              showLabel: false,
            },
            tabBarLabel: 'TEST',
            tabBarIcon: () => <Icon name="address-book" />,
          },
        },
      },
      { initialRouteName: 'default' },
    )
    this.testSwitchNav = testSwitchNav
  }
  render() {
    const TopLevelNavWithStore = createAppContainer(this.testSwitchNav)
    return (
      <Provider store={this.store}>
        <TopLevelNavWithStore />
      </Provider>
    )
  }
}

export function exampleHeader(component: any, title: string): NavigationRouteConfig {
  return {
    screen: component,
    navigationOptions: {
      headerTitle: title,
    },
  }
}
