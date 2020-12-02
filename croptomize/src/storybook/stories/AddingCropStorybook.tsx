//
//  TrainingStorybook.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-05-29
//  Copyright © 2019 Croptomize. All Rights Reserved.

import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryHelper } from './StoryHelper'

import { AddingCropScreens } from '../../ui/navigation/AddingCropNavigation'
import { RootStore } from '../../stores/RootStore'
import { serviceOptions } from '../../services'
import { StoreContext } from '../../stores/StoreContext'
import { SelectBasisContainer } from '../../ui/adding_crop/SelectBasisContainer'

function navigationHelper(startingScreen: string, allScreens: any) {
  return <StoryHelper views={allScreens} defaultView={startingScreen} />
}

const stories = storiesOf('AddingCrop', module)

Object.keys(AddingCropScreens).forEach(route => {
  stories.add(route, () => {
    return navigationHelper(route, AddingCropScreens)
  })
})

stories.add('selectBasis (no results)', () => {
  const rootStore = new RootStore(serviceOptions.testServices)
  rootStore.uiStore.hasSearched = true

  return (
    <StoreContext.Provider value={rootStore}>
      <SelectBasisContainer navigation={{} as any} />
    </StoreContext.Provider>
  )
})
