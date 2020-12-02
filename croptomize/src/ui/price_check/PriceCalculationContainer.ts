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
import { PriceCalculationScreen } from './PriceCalculationScreen'
import { PriceCalculationComponentActions } from './PriceCalculationProps'

function mapStateToProps(_appState: AppState) {
  return {
    visible: true,
    onDismiss: () => console.log(),
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): PriceCalculationComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const PriceCalculationContainer = connector(PriceCalculationScreen)

export { PriceCalculationContainer }
