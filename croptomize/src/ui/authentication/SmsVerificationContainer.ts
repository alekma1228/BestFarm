//
//  src/ui/create_account/SmsVerificationContainer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-21
//  Copyright © 2019 croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { SmsVerificationScreen } from './SmsVerificationScreen'
import { SmsVerificationComponentProps, SmsVerificationComponentActions } from './SmsVerificationProps'

function mapStateToProps(_appState: AppState): SmsVerificationComponentProps {
  return {
    phoneNumber: '(555) 555-5551',
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): SmsVerificationComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const SmsVerificationContainer = connector(SmsVerificationScreen)

export { SmsVerificationContainer }
