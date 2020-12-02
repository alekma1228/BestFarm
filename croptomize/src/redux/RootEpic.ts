//
//  RootEpic.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { combineEpics, Epic } from 'redux-observable'

import { AppServices } from './AppServices'
import { AppState } from './AppState'
import { AllActions } from './AllActions'
// MARKER_IMPORTS_INSERTION_POINT

export type AppEpic = Epic<AllActions, AllActions, AppState, AppServices>

export const RootEpic = combineEpics<AllActions, AllActions, AppState, AppServices>()
// MARKER_EPIC_INSERTION_POINT
