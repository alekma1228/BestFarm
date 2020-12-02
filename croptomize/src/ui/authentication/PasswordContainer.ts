//
//  src/ui/create_account/PasswordContainer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-21
//  Copyright © 2019 croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { PasswordScreen } from './PasswordScreen'
import { PasswordComponentProps, PasswordComponentActions } from './PasswordProps'

function mapStateToProps(_appState: AppState): PasswordComponentProps {
  return {
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): PasswordComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const PasswordContainer = connector(PasswordScreen)

export { PasswordContainer }
