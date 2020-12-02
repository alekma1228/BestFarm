//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { CroptomizeFrameScreen } from './CroptomizeFrameScreen'
import { CroptomizeFrameComponentProps, CroptomizeFrameComponentActions } from './CroptomizeFrameProps'

function mapStateToProps(_appState: AppState): CroptomizeFrameComponentProps {
  return {
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): CroptomizeFrameComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const CroptomizeFrameContainer = connector(CroptomizeFrameScreen)

export { CroptomizeFrameContainer }
