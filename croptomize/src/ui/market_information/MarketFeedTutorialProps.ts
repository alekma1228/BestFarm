//
//  MarketFeedTutorialProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2020-02-11
//  Copyright © 2020 Connect the Grey. All rights reserved.

import { UIStore } from '../../stores/UIStore'
import { Basis } from '../../model/Basis'

export interface MarketFeedTutorialComponentProps {
  uiStore: UIStore
  basis: Basis
  pageIndex: number
  onNext: () => void
  onExit: () => void
}

export type MarketFeedTutorialProps = MarketFeedTutorialComponentProps
