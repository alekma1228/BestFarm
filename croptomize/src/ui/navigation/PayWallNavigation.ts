//
//  PayWall.ts
//  Croptomize
//
//  Created by Modern Logic
//  Copyright © 2019 croptomize. All Rights Reserved.

import { createSwitchNavigator, SwitchNavigatorConfig } from 'react-navigation'

import { LocalizedPricingContainer } from '../pay_wall/LocalizedPricingContainer'
import { PriceCheckModalContainer } from '../pay_wall/PriceCheckModalContainer'
import { SubscriptionContainer } from '../pay_wall/SubscriptionContainer'
import { SelectActiveMonthPayWallContainer } from '../pay_wall/SelectActiveMonthPayWallContainer'
import { kHeaderless } from './NavigationHelpers'
import { PriceCheckPayWallContainer } from '../pay_wall/PriceCheckPayWallContainer'

export enum PayWallScreenNames {
  LocalizedPricing = 'localizedPricing',
  PriceCheckModal = 'priceCheckModal',
  Subscription = 'subscription',
  SelectActiveMonthPayWall = 'selectActiveMonthPayWall',
  PriceCheckPayWall = 'priceCheckPayWall',
}

export const PayWallScreens = {
  [PayWallScreenNames.LocalizedPricing]: {
    screen: LocalizedPricingContainer,
    navigationOptions: { title: '' },
  },
  [PayWallScreenNames.PriceCheckModal]: {
    screen: PriceCheckModalContainer,
    navigationOptions: { title: '' },
  },
  [PayWallScreenNames.Subscription]: {
    screen: SubscriptionContainer,
    navigationOptions: { title: '' },
  },
  [PayWallScreenNames.SelectActiveMonthPayWall]: {
    screen: SelectActiveMonthPayWallContainer,
    navigationOptions: { ...kHeaderless, title: '' },
  },
  [PayWallScreenNames.PriceCheckPayWall]: {
    screen: PriceCheckPayWallContainer,
    navigationOptions: { title: '' },
  },
  // MARKER_INSERT_SCREENS_HERE
}

export const PayWallStack = (config: Partial<SwitchNavigatorConfig> = {}) =>
  createSwitchNavigator(PayWallScreens, {
    initialRouteName: PayWallScreenNames.Subscription,
    ...config,
  })
