//
//  MoLoAnalytics.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Modern Logic, LLC. All Rights Reserved.

import { AnalyticsClass } from 'aws-amplify'
import DeviceInfo from 'react-native-device-info'
import { getLocales, getCountry, uses24HourClock } from 'react-native-localize'
import { NavigationState, NavigationRoute, NavigationAction } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'

const locales = getLocales()
const locale = locales.length > 0 ? locales[0] : undefined
let languageCode = ''
let languageTag = ''

if (locale) {
  languageCode = locale.languageCode
  languageTag = locale.languageTag
}

const Promises: { [key: string]: Promise<string> } = {
  app_display_name: DeviceInfo.getApplicationName(),
  app_name: DeviceInfo.getApplicationName(),
  // baseOS: DeviceInfo.getBaseOS(),
  // bootloader: DeviceInfo.getBootloader(),
  brand: DeviceInfo.getBrand(),
  buildId: DeviceInfo.getBuildId(),
  app_version: DeviceInfo.getBuildNumber(),
  bundleId: DeviceInfo.getBundleId(),
  // codename: DeviceInfo.getCodename(),
  deviceCountry: Promise.resolve(getCountry()),
  deviceId: DeviceInfo.getDeviceId(),
  device_uid: Promise.resolve(''),
  locale_language_code: Promise.resolve(languageCode),
  locale_identifier: Promise.resolve(languageTag),
  device_model: DeviceInfo.getModel(),
  device_model_identifier: DeviceInfo.getDeviceId(),
  deviceType: DeviceInfo.getDeviceType(),
  // display: DeviceInfo.getDisplay(),
  // fingerprint: DeviceInfo.getFingerprint(),
  // firstInstallTime: DeviceInfo.getFirstInstallTime(),
  fontScale: DeviceInfo.getFontScale().then(x => `${x}`),
  freeDiskStorage: DeviceInfo.getFreeDiskStorage().then(x => `${x}`),
  // hardware: DeviceInfo.getHardware(),
  hasNotch: DeviceInfo.hasNotch().then(x => (x ? '1' : '0')),
  // host: DeviceInfo.getHost(),
  // incremental: DeviceInfo.getIncremental(),
  // ipAddress: DeviceInfo.getIPAddress(),
  is24Hour: Promise.resolve(uses24HourClock() ? '1' : '0'),
  isEmulator: DeviceInfo.isEmulator().then(x => (x ? '1' : '0')),
  isLandscape: DeviceInfo.isLandscape().then(x => (x ? '1' : '0')),
  isTablet: DeviceInfo.isTablet().then(x => (x ? '1' : '0')),
  // lastUpdateTime: DeviceInfo.getLastUpdateTime(),
  // macAddress: DeviceInfo.getMACAddress(),
  manufacturer: DeviceInfo.getManufacturer(),
  // maxMemory: DeviceInfo.getMaxMemory(),
  model: DeviceInfo.getModel(),
  // previewSdkInt: DeviceInfo.getPreviewSdkInt(),
  // product: DeviceInfo.getProduct(),
  readableVersion: DeviceInfo.getReadableVersion(),
  // securityPatch: DeviceInfo.getSecurityPatch(),
  os_name: DeviceInfo.getSystemName(),
  os_version: DeviceInfo.getSystemVersion(),
  // tags: DeviceInfo.getTags(),
  totalDiskCapacity: DeviceInfo.getTotalDiskCapacity().then(x => `${x}`),
  totalMemory: DeviceInfo.getTotalMemory().then(x => `${x}`),
  type: DeviceInfo.getType(),
  device_identifier_for_vendor: DeviceInfo.getUniqueId(),
  version: DeviceInfo.getVersion(),
  // isAirPlaneMode: DeviceInfo.isAirplaneMode(),
}

export type MoLoAttributes = { [key: string]: string }

export interface AnalyticsType {
  navigationStateChanged(prevState: NavigationState, currentState: NavigationState, _action: NavigationAction): void
  record(eventName: string, attrs?: Partial<MoLoAttributes>): Promise<void>
}

function uuid() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, a =>
    (+a ^ ((Math.random() * 16) >> (+a / 4))).toString(16),
  )
}

async function getGlobalAttrs(): Promise<Partial<MoLoAttributes>> {
  const keyValuePairs = await Promise.all(
    Object.entries(Promises).map(([key, value]) => {
      return value.then(value => [key, value])
    }),
  )
  const attrs = Object.fromEntries(keyValuePairs)
  let device_uid = await AsyncStorage.getItem('device_uid')
  if (!device_uid) {
    device_uid = uuid()
    await AsyncStorage.setItem('device_uid', device_uid)
  }
  return { ...attrs, device_uid }
}

export class MoLoAnalytics implements AnalyticsType {
  private analytics?: AnalyticsClass
  private globalAttrs: Promise<Partial<MoLoAttributes>>
  constructor(analytics: AnalyticsClass | undefined) {
    this.analytics = analytics
    this.globalAttrs = getGlobalAttrs()
    this.record('setupPinpoint')
  }

  async record(eventName: string, attrs?: Partial<MoLoAttributes>): Promise<void> {
    const analytics = this.analytics
    if (!analytics) {
      return
    }
    const globalAttrs = await this.globalAttrs
    await analytics.record({ name: eventName, attributes: { ...globalAttrs, ...attrs } })
    return
  }

  getActiveRouteName(navigationState: NavigationState | NavigationRoute): string | undefined {
    if (!navigationState) {
      return undefined
    }

    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route)
    }
    return route.routeName
  }

  navigationStateChanged(prevState: NavigationState, currentState: NavigationState, _action: NavigationAction) {
    const currentScreen = this.getActiveRouteName(currentState)
    const prevScreen = this.getActiveRouteName(prevState)

    if (currentScreen !== prevScreen) {
      const event = `Screen-${prevScreen}`
      this.record(event).catch((err: any) => {
        console.log(`Could not record analytics event ${event} because `, err)
      })
    }
  }
}

let Analytics: MoLoAnalytics = new MoLoAnalytics(undefined)

function setUpAnalytics(analytics: AnalyticsClass): MoLoAnalytics {
  const newAnalytics = new MoLoAnalytics(analytics)
  Analytics = newAnalytics
  return newAnalytics
}

export { Analytics, setUpAnalytics }
