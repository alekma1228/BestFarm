//
//  index.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { SplashScreen } from '../../ui/splash_screen/SplashScreen'
import { StoryHelper } from './StoryHelper'
import { NavigationRouteConfig } from 'react-navigation'
import { WelcomeScreen } from '../../ui/welcome/WelcomeScreen'
import { LoginScreen } from '../../ui/authentication/LoginScreen'
require('./AuthStorybook.tsx')
require('./AddingCropStorybook.tsx')
require('./MarketInformationStorybook.tsx')
require('./PriceCheckStorybook.tsx')
require('./PayWallStorybook.tsx')
require('./AccountStorybook')
require('./ComponentsStorybook.tsx')

// MARKER_IMPORT_COMPONENT_HERE

storiesOf('SplashScreen', module).add('default view', () => (
  <StoryHelper views={{ Welcome: noHeader(SplashScreen) }} defaultView={'Welcome'} />
))

storiesOf('WelcomeScreen', module).add('welcomeScreen', () => (
  <StoryHelper views={{ Welcome: noHeader(WelcomeScreen) }} defaultView={'Welcome'} />
))

export function noHeader(component: any): NavigationRouteConfig {
  return {
    screen: component,
    navigationOptions: {
      headerTransparent: true,
    },
  }
}

storiesOf('Login', module).add('default view', () => (
  <StoryHelper
    views={{ Login: noHeader(() => <LoginScreen busy={false} login={() => console.log('login attempt')} />) }}
    defaultView={'Login'}
  />
))

// MARKER_INSERT_STORIES_HERE
