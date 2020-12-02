//
//  App.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

YellowBox.ignoreWarnings([
  'ViewPagerAndroid',
  'Slider',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillMount',
  'Warning: componentWillUpdate is deprecated',
  'You should only render one navigator',
  '-[RCTRootView cancelTouches',
])

import Amplify, { I18n, Analytics } from 'aws-amplify'
import { Adjust, AdjustConfig } from 'react-native-adjust'
import i18n from 'i18n-js'
import React from 'react'
import { YellowBox } from 'react-native'
import { NavigationAction, NavigationContainer, NavigationState } from 'react-navigation'
import { Reducer, Store } from 'redux'
import { Epic } from 'redux-observable'
import { MockAnalyticsService } from '../analytics/MockAnalyticsService'
import { setUpAnalytics } from '../analytics/MoLoAnalytics'
import { AllActions } from '../redux/AllActions'
import { AppScenario } from '../redux/AppScenario'
import { AppServices } from '../redux/AppServices'
import { AppState } from '../redux/AppState'
import { RootEpic } from '../redux/RootEpic'
import { rootReducer } from '../redux/RootReducer'
import { Configuration, CrashReporter } from '../services/CrashReporter'
import { StorybookUIRoot } from '../storybook'
import { setWarnAnalytics } from '../utilities/warn'
import { MillerApp, MillerAppProps, MillerAppState } from './MillerApp'
import { NavContext, TopLevelNavigator } from './navigation/AppNavigation'
import { SplashScreen } from './splash_screen/SplashScreen'
import { RootStore } from '../stores/RootStore'
import { serviceOptions } from '../services'
import { CustomAsyncStorage } from './authentication/CustomAsyncStorage'

// Amplify.Logger.LOG_LEVEL = 'VERBOSE'

// MARKER_IMPORTS

// eslint-disable-next-line
const globalTranslations = require('../translations/global.json')
// eslint-disable-next-line
const awsConfig = require('../aws-exports.js')

let configured = false
function configOnce() {
  if (configured) {
    return
  }
  configured = true
  const config = {
    ...awsConfig['default'],
    storage: CustomAsyncStorage,
  }
  Amplify.configure(config)
  Analytics.configure(config)

  const adjustConfig = new AdjustConfig(
    'qzlael0xufpc',
    __DEV__ ? AdjustConfig.EnvironmentSandbox : AdjustConfig.EnvironmentProduction,
  )
  Adjust.create(adjustConfig)
}

// MARKER_APP_GLOBAL_INIT

function createDependencies(appScenario: AppScenario): AppServices {
  switch (appScenario.type) {
    case 'mock':
      if (appScenario.showMockUI) {
        configOnce()

        return {
          analytics: new MockAnalyticsService(),
        }
      }
      return {
        analytics: new MockAnalyticsService(),
        // MARKER_MOCK_SERVICES
      }
    case 'real':
      configOnce()
      const analytics = setUpAnalytics(Amplify.Analytics)
      setWarnAnalytics(analytics)

      return {
        analytics: analytics,
        // MARKER_REAL_SERVICES
      }
  }
}

export interface AppProps extends MillerAppProps<AppScenario> {}

export interface AppComponentState extends MillerAppState {}

// console.log(Localization.locale)
i18n.fallbacks = true
i18n.translations = globalTranslations
i18n.locale = 'en' // Localization.locale

I18n.setLanguage('en') // Localization.locale
I18n.putVocabularies(globalTranslations)

class App extends MillerApp<AppProps, AppComponentState, AppState, AllActions, AppScenario, NavContext, AppServices> {
  private crashReporter: CrashReporter | null
  constructor(props: AppProps) {
    super(props)
    this.crashReporter = null

    this.state = {
      ...this.getInitialState(props),
    }
  }

  componentWillUnmount() {
    Adjust.componentWillUnmount()
  }

  getWelcomeScreenName(): string {
    return 'Welcome'
  }

  componentDidMount() {
    if (!this.state.isStorybook) {
      // this.store.dispatch({ category: AllActionCategories.AUTH, type: AllActionTypes.AUTH_APP_LAUNCHED })
    }
    // This is late enough that react won't stomp our reporter
    this.crashReporter = new CrashReporter(new Configuration(this.services.analytics))
    this.crashReporter.leaveBreadcrumb('ComponentDidMount', {})

    // MARKER_COMPONENT_DID_MOUNT
  }

  rootEpic(): Epic<AllActions, AllActions, AppState, AppServices> {
    return RootEpic
  }

  rootReducer(): Reducer<AppState> {
    return rootReducer
  }

  public setupMobXStore(): RootStore {
    return new RootStore({ ...serviceOptions.runtimeServices, analyticsService: this.services.analytics })
  }

  createAppServices(scenario: AppScenario): AppServices {
    const sc: AppScenario = scenario || { type: 'real' }
    return createDependencies(sc)
  }

  renderSplashScreen(): React.ReactNode {
    return <SplashScreen />
  }

  renderStorybookUI(): React.ReactNode {
    return <StorybookUIRoot />
  }

  createNavContext(store: Store<AppState, AllActions>): NavContext {
    return {
      store,
      analytics: this.services.analytics,
      // MARKER_CREATE_NAV_CONTEXT
    }
  }

  onNavigationStateChange(prev: NavigationState, next: NavigationState, action: NavigationAction) {
    super.onNavigationStateChange(prev, next, action)
    this.services.analytics.navigationStateChanged(prev, next, action)
  }

  renderTopLevelNavigator(navContext: NavContext, initialScreen: string | undefined): NavigationContainer {
    return TopLevelNavigator(navContext, initialScreen)
  }
}

export { App }
