//
//  MarketInformation.ts
//  Croptomize
//
//  Created by Modern Logic
//  Copyright © 2019 croptomize. All Rights Reserved.

import React from 'react'
import { createStackNavigator, StackNavigatorConfig, NavigationScreenConfigProps } from 'react-navigation'

import { MarketDetailContainer } from '../market_information/MarketDetailContainer'
import { MarketFeedContainer } from '../market_information/MarketFeedContainer'
import { AccountDetailButton } from '../account/AccountDetailButton'
import { View, Text } from 'react-native'
import {
  pictureForSymbol,
  colorForSymbol,
  getDisplayNameForCropType,
  getCropTypeForCropSymbol,
} from '../../model/Symbols'
import { CropIcon } from '../components/CropIcon'
import { MarketInformationScreenNames } from './MarketInformationScreenNames'

const marketFeedNavigationOptions = () => {
  return {
    title: 'Market Feed',
    headerRight: <AccountDetailButton returnToScreen={MarketInformationScreenNames.MarketFeed} />,
    headerLeft: null,
  }
}

const marketDetailNavigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
  const selectedCropSymbol = navigation.getParam('selectedCropSymbol', 'Market Details')
  return {
    headerTitle: (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CropIcon
          style={{ marginRight: 6, height: 25, width: 25 }}
          pictureStyle={{ height: 12, width: 12 }}
          backgroundColor={colorForSymbol(selectedCropSymbol)}
          picture={pictureForSymbol(selectedCropSymbol)}
        />
        <Text style={{ fontSize: 17, fontFamily: 'Montserrat-Medium' }}>
          {getDisplayNameForCropType(getCropTypeForCropSymbol(selectedCropSymbol), true)}
        </Text>
      </View>
    ),
  }
}

export const MarketInformationScreens = {
  [MarketInformationScreenNames.MarketFeed]: {
    screen: MarketFeedContainer,
    navigationOptions: marketFeedNavigationOptions,
  },
  [MarketInformationScreenNames.MarketDetail]: {
    screen: MarketDetailContainer,
    navigationOptions: marketDetailNavigationOptions,
  },
  // MARKER_INSERT_SCREENS_HERE
}

export const MarketInformationStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(MarketInformationScreens, {
    initialRouteName: MarketInformationScreenNames.MarketFeed,
    ...config,
  })
