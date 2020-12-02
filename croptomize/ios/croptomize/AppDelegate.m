/**
 * Copyright (c) 2015-present, Connect the Grey
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <react-native-branch/RNBranch.h>
#import "Orientation.h"

#import "AppDelegate+ModernLogic.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [self maybeSwizzleLogNoise];

  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *serverUrl = [defaults objectForKey:@"SERVER_URL"];
  if (serverUrl == nil) {
    serverUrl = @"DEFAULT";
  }
  const char * launchScenarioC = getenv("LaunchScenario");
  NSMutableDictionary *initialProperties = @{}.mutableCopy;
  if (launchScenarioC) {
    initialProperties[@"LaunchScenario"] = [NSString stringWithUTF8String: launchScenarioC];
  }

  initialProperties[@"serverUrl"] = serverUrl;

  NSString *storybookMode = [defaults objectForKey:@"STORYBOOK_MODE"];
  if (storybookMode == nil) {
    storybookMode = @"NO";
  }
  initialProperties[@"storybookMode"] = storybookMode;
  
  #ifdef DEBUG
      [RNBranch useTestInstance];
  #endif
  
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
     
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"croptomize"
                                            initialProperties:initialProperties];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  if (![RNBranch.branch application:app openURL:url options:options]) {
    [[FBSDKApplicationDelegate sharedInstance] application:app
      openURL:url
      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
      annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
    ];
  }
  
  
  return [self maybeEnableStorybook: url];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    return [RNBranch continueUserActivity:userActivity];
}
@end
