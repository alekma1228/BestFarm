//
//  TrainingStorybook.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-05-29
//  Copyright © 2019 Croptomize. All Rights Reserved.

import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { LoadingView } from '../../ui/components/LoadingView'

const stories = storiesOf('Components', module)

stories.add('LoadingView', () => {
  return <LoadingView />
})
