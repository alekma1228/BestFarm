//
//  src/ui/create_account/FullNameContainer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-21
//  Copyright © 2019 croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { FullNameScreen } from './FullNameScreen'
import { FullNameComponentProps, FullNameComponentActions } from './FullNameProps'

function mapStateToProps(_appState: AppState): FullNameComponentProps {
  return {
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): FullNameComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const FullNameContainer = connector(FullNameScreen)

export { FullNameContainer }
