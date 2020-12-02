//
//  Container.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-27
//  Copyright © 2019 croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { PriceCheckPayWallScreen } from './PriceCheckPayWallScreen'
import { PriceCheckPayWallComponentProps, PriceCheckPayWallComponentActions } from './PriceCheckPayWallProps'

function mapStateToProps(_appState: AppState): PriceCheckPayWallComponentProps {
  return {
    onSubscribe: () => console.log(),
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): PriceCheckPayWallComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const PriceCheckPayWallContainer = connector(PriceCheckPayWallScreen)

export { PriceCheckPayWallContainer }
