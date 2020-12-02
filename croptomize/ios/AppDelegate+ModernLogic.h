//
//  AppDelegate+ModernLogic.h
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.
//

#ifndef AppDelegate_ModernLogic_h
#define AppDelegate_ModernLogic_h
#import "AppDelegate.h"

@interface AppDelegate (ModernLogic)

- (void) maybeSwizzleLogNoise;
- (BOOL) maybeEnableStorybook:(NSURL*) url;

@end

#endif /* AppDelegate_ModernLogic_h */
