//
//  IAppScenario.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

interface RealAppScenario {
  type: 'real'
}

interface MockAppScenario {
  type: 'mock'
  showMockUI: boolean
}

export type AppScenario = RealAppScenario | MockAppScenario
