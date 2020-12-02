//
//  TrainingStorybook.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-05-29
//  Copyright © 2019 Croptomize. All Rights Reserved.

import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryHelper } from './StoryHelper'

import { setupAuthScreens } from '../../ui/authentication/AuthNavigation'

function navigationHelper(startingScreen: string, allScreens: any) {
  return <StoryHelper views={allScreens} defaultView={startingScreen} />
}

const stories = storiesOf('CreateAccount', module)

const AuthScreens = setupAuthScreens('')

Object.keys(AuthScreens).forEach(route => {
  stories.add(route, () => {
    return navigationHelper(route, AuthScreens)
  })
})
