//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { EditFieldScreen } from './EditFieldScreen'
import { EditFieldComponentProps, EditFieldComponentActions } from './EditFieldProps'

function mapStateToProps(_appState: AppState): EditFieldComponentProps {
  return {
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): EditFieldComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const EditFieldContainer = connector(EditFieldScreen)

export { EditFieldContainer }
