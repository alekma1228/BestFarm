//
//  src/ui/pay_wall/PriceCheckModalContainer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-23
//  Copyright © 2019 croptomize. All rights reserved.

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../redux/AppState'
import { AllActions } from '../../redux/AllActions'
import { PriceCheckModalScreen } from './PriceCheckModalScreen'
import { PriceCheckModalComponentProps, PriceCheckModalComponentActions } from './PriceCheckModalProps'

function mapStateToProps(_appState: AppState): PriceCheckModalComponentProps {
  return {
    // MARKER_MAP_STATE_TO_PROPS_PROPERTIES
  }
}

function mapDispatchToProps(_dispatch: Dispatch<AllActions>): PriceCheckModalComponentActions {
  return {
    // MARKER_MAP_DISPATCH_TO_PROPS_ACTIONS
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const PriceCheckModalContainer = connector(PriceCheckModalScreen)

export { PriceCheckModalContainer }
