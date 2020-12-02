//
//  MockAnalyticsService.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-08-29
//  Copyright © 2019 Connect the Grey. All Rights Reserved.

import { AnalyticsType, MoLoAttributes } from './MoLoAnalytics'
import { NavigationState, NavigationAction } from 'react-navigation'

export class MockAnalyticsService implements AnalyticsType {
  navigationStateChanged(_prevState: NavigationState, _currentState: NavigationState, _action: NavigationAction): void {
    // no op
  }
  async record(_eventName: string, _attrs?: Partial<MoLoAttributes>): Promise<void> {
    // no op
  }
}
