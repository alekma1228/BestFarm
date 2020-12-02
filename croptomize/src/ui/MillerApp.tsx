//
//  MillerApp.tsx
//  Modern Logic
//
//  Created by Modern Logic on 2019-04-27
//  Copyright © 2019 Modern Logic, LLC. All Rights Reserved.
import React from 'react'
import { Provider } from 'react-redux'
import { Store, Action, Reducer } from 'redux'
import { createAppContainer, NavigationState, NavigationContainer, NavigationAction } from 'react-navigation'
import { createStoreWithMiddleware } from '../redux/CreateStore'
import { Epic } from 'redux-observable'
import { RootStore } from '../stores/RootStore'
import { StoreContext } from '../stores/StoreContext'

export interface MillerAppProps<IAppScenario> {
  appScenario: IAppScenario
  storybookMode: string
  hostAddress: string | undefined
}
export interface MillerAppState {
  isStorybook: boolean | 'unknown'
  hostAddress: string | undefined
}

export abstract class MillerApp<
  Props extends MillerAppProps<AppScenario>,
  State extends MillerAppState,
  AppState,
  AllActions extends Action<any>,
  AppScenario extends { type: 'mock' | 'real' },
  NavContext,
  AppServices
> extends React.Component<Props, State> {
  protected lazyStore?: Store<AppState, AllActions>
  protected appScenario: AppScenario
  public get store(): Store<AppState, AllActions> {
    const store = this.lazyStore
    if (store) {
      return store
    }
    const appServices = this.services
    const rootEpic = this.rootEpic()
    const rootReducer = this.rootReducer()
    const newStore = createStoreWithMiddleware<AppState, AllActions, AppServices>(appServices, rootEpic, rootReducer)
    this.lazyStore = newStore
    this.didCreateStore(newStore)
    return newStore
  }

  protected lazyServices?: AppServices
  public get services(): AppServices {
    const services = this.lazyServices
    if (services) {
      return services
    }
    const newServices = this.createAppServices(this.appScenario)
    this.lazyServices = newServices
    return newServices
  }

  protected routeName?: string

  constructor(props: Props) {
    super(props)

    let appScenario: AppScenario = this.props.appScenario
    if (props.storybookMode === 'YES') {
      appScenario = { ...appScenario, type: 'mock' }
    }
    this.appScenario = appScenario
    // MARKER_APP_CONSTRUCTOR
  }

  getInitialState(props: Props) {
    return {
      isStorybook: props.storybookMode === 'YES',
      hostAddress: props.hostAddress,
    }
  }

  didCreateStore(_store: Store<AppState, AllActions>) {
    // override
  }

  public abstract setupMobXStore(): RootStore
  abstract rootEpic(): Epic<AllActions, AllActions, AppState, AppServices>
  abstract rootReducer(): Reducer<AppState>
  abstract createAppServices(scenario: AppScenario): AppServices

  abstract renderSplashScreen(): React.ReactNode

  abstract renderStorybookUI(): React.ReactNode

  abstract createNavContext(store: Store<AppState, AllActions>): NavContext

  abstract renderTopLevelNavigator(navContext: NavContext, initialScreen: string | undefined): NavigationContainer

  onNavigationStateChange(
    _prevNavigationState: NavigationState,
    _nextNavigationState: NavigationState,
    _action: NavigationAction,
  ) {
    // Override, e.g. for analytics
  }

  componentDidMount() {
    // MARKER_APP_COMPONENT_DID_MOUNT
  }

  render() {
    if (this.state.isStorybook === 'unknown') {
      return this.renderSplashScreen()
    }
    if (this.state.isStorybook) {
      return this.renderStorybookUI()
    }
    const navContext = this.createNavContext(this.store)
    const TopLevelNavWithStore = createAppContainer(this.renderTopLevelNavigator(navContext, this.routeName))
    return (
      <Provider store={this.store}>
        <StoreContext.Provider value={this.setupMobXStore()}>
          <TopLevelNavWithStore
            onNavigationStateChange={(prev: NavigationState, next: NavigationState, action: NavigationAction) =>
              this.onNavigationStateChange(prev, next, action)
            }
          />
        </StoreContext.Provider>
      </Provider>
    )
  }
}
