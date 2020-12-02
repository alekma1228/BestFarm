//
//  AppDelegate+ModernLogic.m
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <objc/runtime.h>
#import "AppDelegate+ModernLogic.h"

static UIViewController *recursivelyFindTopmostViewController(UIViewController *vc) {
  if ([vc isKindOfClass:[UITabBarController class]]) {
    UITabBarController *tabBarController = (id) vc;
    UIViewController *selectedVC = [tabBarController selectedViewController];
    if (selectedVC) {
      return recursivelyFindTopmostViewController(selectedVC);
    }
  }
  UIViewController *presentedVC = [vc presentedViewController];
  if (presentedVC) {
    return recursivelyFindTopmostViewController(presentedVC);
  }
  if ([vc isKindOfClass:[UINavigationController class]]) {
    UINavigationController *navController = (id) vc;
    UIViewController *selectedVC = [navController topViewController];
    if (selectedVC) {
      return recursivelyFindTopmostViewController(selectedVC);
    }
  }
  return vc;
}
@implementation UIViewController (ModernLogicTopmostViewController)

-(UIViewController *)topmostViewController
{
  return recursivelyFindTopmostViewController(self);
}
@end

@implementation UIApplication (ModernLogicTopMostViewController)

-(UIViewController *) topmostViewController {
    UIWindow *window = [self keyWindow];
    if (!window) {
      return nil;
    }
    UIViewController *rootVC = window.rootViewController;
    if (!rootVC) {
      return nil;
    }
    return rootVC.topmostViewController;
  }
@end

@implementation NSURL (ModernLogicQueryDictionary)

-(NSDictionary *) queryDictionary
{
  NSURLComponents *components = [[NSURLComponents alloc] initWithURL:self resolvingAgainstBaseURL: NO];
  if (!components) {
    return @{};
  }
  NSArray<NSURLQueryItem *> *items = components.queryItems;
  if (!items) {
    return @{};
  }
  NSMutableDictionary *result = [[NSMutableDictionary alloc] initWithCapacity:items.count];
  for (NSURLQueryItem * item in items) {
    [result setObject:item.value forKey:item.name];
  }
  return [result copy];
}

@end

#ifdef DEBUG

@interface RCTReconnectingWebSocket : NSObject
- (void)reconnect;
@end

@implementation RCTReconnectingWebSocket (mlk_swizzle)

- (void)mlk_reconnect {

}

@end

@interface RCTInspectorPackagerConnection : NSObject
- (void)reconnect;
@end

@implementation RCTInspectorPackagerConnection (mlk_swizzle)

- (void)mlk_reconnect {

}

@end

#endif

@implementation AppDelegate (ModernLogic)

-(void) maybeSwizzleLogNoise {
  #ifdef DEBUG
    Method old  = class_getInstanceMethod([RCTReconnectingWebSocket class], @selector(reconnect));
    Method new = class_getInstanceMethod([RCTReconnectingWebSocket class], @selector(mlk_reconnect));
    method_exchangeImplementations(old, new);
    old  = class_getInstanceMethod([RCTInspectorPackagerConnection class], @selector(reconnect));
    new = class_getInstanceMethod([RCTInspectorPackagerConnection class], @selector(mlk_reconnect));
    method_exchangeImplementations(old, new);
  #endif
}

-(BOOL) maybeEnableStorybook:(NSURL*)url {
  if ([url.scheme isEqualToString: @"croptomize"] && [url.host isEqualToString: @"debug"]) {
    NSDictionary *params = [url queryDictionary];
    BOOL storybookMode = [[params objectForKey: @"storybook"] isEqualToString: @"YES"];
    UIViewController *vc = UIApplication.sharedApplication.topmostViewController;
    if (vc) {
      NSString *message = [[NSString alloc] initWithFormat:@"%@ Storybook Mode?", storybookMode ? @"Turn on" : @"Turn off"];
      UIAlertController *alert = [UIAlertController alertControllerWithTitle: @"Update Storybook Mode" message:message preferredStyle: UIAlertControllerStyleAlert];
      UIAlertAction * cancelAction = [UIAlertAction actionWithTitle: @"Cancel" style: UIAlertActionStyleCancel handler: ^(UIAlertAction *action) { } ];

      [alert addAction: cancelAction];
      UIAlertAction * okAction = [UIAlertAction actionWithTitle: @"Update" style: UIAlertActionStyleDestructive handler: ^(UIAlertAction *action) {
        NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
        [defaults setObject:storybookMode ? @"YES" : @"NO" forKey:@"STORYBOOK_MODE"];
        CFPreferencesSynchronize(kCFPreferencesCurrentApplication, kCFPreferencesCurrentUser, kCFPreferencesCurrentHost);
        NSLog(@"Saved storybook mode: %@", [defaults objectForKey:@"STORYBOOK_MODE"]);
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
          exit(0);
        });
      } ];
      [alert addAction: okAction];
      [vc presentViewController:alert animated: YES completion:^{}];
      return YES;
    }
  }
  return NO;
}

@end
