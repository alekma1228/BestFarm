//
//  warn.ts
//  HabitAware
//
//  Created by Modern Logic on 2019-08-02
//  Copyright © 2019 HabitAware. All Rights Reserved.
import { AnalyticsType } from '../analytics/MoLoAnalytics'

let analytics: AnalyticsType | undefined = undefined

export function setWarnAnalytics(inAnalytics: AnalyticsType) {
  analytics = inAnalytics
}

export function warn(message?: any, ...optionalParams: any[]): void {
  if (__DEV__) {
    console.warn.apply(console, [message, ...optionalParams])
  }
  const a = analytics
  if (a && message && typeof message === 'string') {
    a.record('DEBUG_LOG', { custom_message: message }).catch(() => console.log(`can't warn to analytics`))
  }
}
