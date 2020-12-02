//
//  DefaultStackNavigation.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-08-30
//  Copyright © 2019 Connect the Grey. All Rights Reserved.

import React from 'react'
import { BackButton } from '../components/BackButton'
import { NavigationScreenConfigProps, StackNavigatorConfig } from 'react-navigation'
import { AppColors } from '../styles/AppStyles'

const defaultStackNavigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
  return {
    headerLeft: <BackButton onPress={() => navigation.pop()} />,
    headerStyle: {
      backgroundColor: AppColors.lightCream,
    },
  }
}

export const defaultStackNavigatorConfig: Partial<StackNavigatorConfig> = {
  defaultNavigationOptions: defaultStackNavigationOptions,
}
