//
//  src/ui/create_account/SmsVariantContainer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-21
//  Copyright © 2019 croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { SmsVariantScreen } from './SmsVariantScreen'
import { SmsVariantComponentProps, SmsVariantComponentActions } from './SmsVariantProps'

function mapStateToProps(_appState: AppState): SmsVariantComponentProps {
  return {
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): SmsVariantComponentActions {
  return {
    createAccount: () => console.log('Create Account'),
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const SmsVariantContainer = connector(SmsVariantScreen)

export { SmsVariantContainer }
