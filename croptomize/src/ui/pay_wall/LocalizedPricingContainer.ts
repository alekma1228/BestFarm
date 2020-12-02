//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-19
//  Copyright © 2019 Croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { LocalizedPricingComponentProps, LocalizedPricingComponentActions } from './LocalizedPricingProps'
import { LocalizedPricingScreen } from './LocalizedPricingScreen'

function mapStateToProps(_appState: AppState): LocalizedPricingComponentProps {
  return {
    visible: true,
    onDismiss: () => console.log(),
    onSubscribe: () => console.log(),
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): LocalizedPricingComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const LocalizedPricingContainer = connector(LocalizedPricingScreen)

export { LocalizedPricingContainer }
