//
//  Props.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-07-19
//  Copyright © 2019 Croptomize. All rights reserved.

import { NavigationInjectedProps } from 'react-navigation'
import { CropType } from '../../model/Symbols'
import { UIStore } from '../../stores/UIStore'

export interface PriceCalculationComponentProps {
  // MARKER_COMPONENT_PROPS
  visible: boolean
  onDismiss: () => void
  probability: number
  cropType: CropType
  cropMonth: string
  cropYear: string
  checkPrice: string
  showFrame: () => void
  uiStore: UIStore
  onNextTutorial: () => void
  tutorialPageIndex: number
}

export interface PriceCalculationComponentActions {
  // MARKER_COMPONENT_ACTIONS
}

export type PriceCalculationProps = NavigationInjectedProps &
  PriceCalculationComponentProps &
  PriceCalculationComponentActions
