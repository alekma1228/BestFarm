import { UIStore } from '../../stores/UIStore'

//
//  src/ui/welcome/WelcomeProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

export interface WelcomeComponentProps {
  uiStore: UIStore
}

export interface WelcomeComponentActions {}

export type WelcomeProps = WelcomeComponentProps & WelcomeComponentActions
