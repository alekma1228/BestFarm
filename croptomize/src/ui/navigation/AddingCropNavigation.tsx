//
//  AddingCrop.ts
//  Croptomize
//
//  Created by Modern Logic
//  Copyright © 2019 croptomize. All Rights Reserved.
import React, { useState } from 'react'
import { createStackNavigator, StackNavigatorConfig, NavigationScreenConfigProps } from 'react-navigation'

import { SelectActiveMonthContainer } from '../adding_crop/SelectActiveMonthContainer'
import { SelectBasisContainer } from '../adding_crop/SelectBasisContainer'
import { SelectCropContainer } from '../adding_crop/SelectCropContainer'
import { BackButton } from '../components/BackButton'
import { MarketInformationScreenNames } from './MarketInformationScreenNames'
import { AddingCropScreenNames } from './AddingCropScreenNames'
import { Icon } from 'react-native-elements'
import { AppColors } from '../styles/AppStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ModalPopup } from '../components/ModalPopup'

const AddCropInfoButton = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <TouchableOpacity style={{ marginRight: 16 }} onPress={() => setShowModal(true)}>
      <Icon color={AppColors.navy} name={'info'} type={'fontawesome'} size={20} />
      <ModalPopup
        visible={showModal}
        title=""
        buttonText="OK"
        iconName="info"
        hideExitButton={true}
        message="All pricing data is provided by barchart.com, and is on a 10 minute delay."
        onButtonPress={() => setShowModal(false)}
        onDismiss={() => setShowModal(false)}
      ></ModalPopup>
    </TouchableOpacity>
  )
}

const selectNavigationOptions = (title: string, cancelAddingOnBackButton = false) => {
  return ({ navigation }: NavigationScreenConfigProps) => {
    const values: any = {
      title: title,
      headerRight: <AddCropInfoButton />,
    }

    if (cancelAddingOnBackButton) {
      values.headerLeft = <BackButton onPress={() => navigation.navigate(MarketInformationScreenNames.MarketFeed)} />
    }

    return values
  }
}

export const AddingCropScreens = {
  [AddingCropScreenNames.SelectActiveMonth]: {
    screen: SelectActiveMonthContainer,
    navigationOptions: selectNavigationOptions('Select Active Month'),
  },
  [AddingCropScreenNames.SelectBasis]: {
    screen: SelectBasisContainer,
    navigationOptions: selectNavigationOptions('Select Basis'),
  },
  [AddingCropScreenNames.SelectCrop]: {
    screen: SelectCropContainer,
    navigationOptions: selectNavigationOptions('Select Crop', true),
  },
}

export const AddingCropStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(AddingCropScreens, {
    initialRouteName: AddingCropScreenNames.SelectCrop,
    ...config,
  })
