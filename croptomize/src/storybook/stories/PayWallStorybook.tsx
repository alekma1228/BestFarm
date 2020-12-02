//
//  TrainingStorybook.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-05-29
//  Copyright © 2019 Croptomize. All Rights Reserved.

import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryHelper } from './StoryHelper'

import { PayWallScreens } from '../../ui/navigation/PayWallNavigation'

function navigationHelper(startingScreen: string, allScreens: any) {
  return <StoryHelper views={allScreens} defaultView={startingScreen} />
}

const stories = storiesOf('PayWall', module)

Object.keys(PayWallScreens).forEach(route => {
  stories.add(route, () => {
    return navigationHelper(route, PayWallScreens)
  })
})
