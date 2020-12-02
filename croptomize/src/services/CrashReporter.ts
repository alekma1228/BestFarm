//
//  AmplifyCrashReporter.ts
//  HabitAware
//
//  Created by Modern Logic on 2019-05-24
//  Copyright © 2019 HabitAware. All Rights Reserved.

// import { tracking } from 'promise/setimmediate/rejection-tracking'
import { AnalyticsType } from '../analytics/MoLoAnalytics'
import { warn } from '../utilities/warn'

const BREADCRUMB_MAX_LENGTH = 30

enum SeverityReason {
  handledException = 'handledException',
  unhandledException = 'unhandledException',
  unhandledPromiseRejection = 'unhandledPromiseRejection',
}

interface Breadcrumb {}
/**
 * A CrashReporter monitoring and reporting client
 */
export class CrashReporter {
  private config: Configuration
  private breadcrumbs: Breadcrumb[]

  constructor(config: Configuration) {
    this.config = config
    this.breadcrumbs = []
    if (config.handlePromiseRejections) {
      this.handlePromiseRejections()
    }
    this.handleUncaughtErrors()
  }

  /**
   * Registers a global error handler which sends any uncaught error to
   * CrashReporter before invoking the previous handler, if any.
   */
  handleUncaughtErrors = () => {
    if (ErrorUtils) {
      const previousHandler = ErrorUtils.getGlobalHandler()

      ErrorUtils.setGlobalHandler((error, isFatal) => {
        if (this.config.autoNotify) {
          this.notify(
            error,
            true,
            () => {
              if (previousHandler) {
                // Wait 150ms before terminating app, allowing native processing
                // to complete, if any. On iOS in particular, there is no
                // synchronous means ensure a report delivery attempt is
                // completed before invoking callbacks.
                setTimeout(() => {
                  previousHandler(error, isFatal)
                }, 150)
              }
            },
            new HandledState('error', true, SeverityReason.unhandledException),
          )
        } else if (previousHandler) {
          previousHandler(error, isFatal)
        }
      })
    } else {
      warn('Cannot install uncaught error handler')
    }
  }

  handlePromiseRejections = () => {
    // import tracking = promise.setimmediate.rejection // require('promise/setimmediate/rejection-tracking')
    // *** Terminating app due to uncaught exception 'RCTFatalException: Unhandled JS Exception: TypeError: undefined is not an object (evaluating 'u.tracking.enable')
    // tracking.enable({
    //   allRejections: true,
    //   onUnhandled: (_: any, error: Error) => {
    //     this.notify(error, true, null, new HandledState('error', true, SeverityReason.unhandledPromiseRejection))
    //   },
    //   onHandled: () => {
    //     // No-op
    //   },
    // })
  }

  /**
   * Sends an error report to CrashReporter
   * @param error               The error instance to report
   * @param beforeSendCallback  A callback invoked before the report is sent
   *                            so additional information can be added
   * @param postSendCallback    Callback invoked after request is queued
   */
  async notify(
    error: Error,
    blocking: boolean,
    postSendCallback: null | ((success: boolean) => void),
    _handledState: HandledState,
  ) {
    if (!(error instanceof Error)) {
      warn('CrashReporter could not notify: error must be of type Error')
      if (postSendCallback) {
        postSendCallback(false)
      }
      return
    }

    const report = new Report(error, _handledState)

    const payload = report.toJSON()
    payload.blocking = !!blocking
    console.log('\n\n** ERR **', error)
    await this.config.analytics.record('DEBUG_LOG', { custom_message: `Oldest item deleted ${payload.serialNumber}` })
    // TrackJS.track(error)

    // Analytics.record({
    //   name: _handledState.unhandled,
    //   attributes: payload,
    // }).then(() => {
    //   if (postSendCallback) { postSendCallback(true) }
    // }).catch(() => {
    //   if (postSendCallback) { postSendCallback(false) }
    // })
  }

  /**
   * Leaves a 'breadcrumb' log message. The most recent breadcrumbs
   * are attached to subsequent error reports.
   */
  leaveBreadcrumb = (name: string, metadata?: { [key: string]: any }) => {
    if (typeof name !== 'string') {
      warn(`Breadcrumb name must be a string, got '${name}'. Discarding.`)
      return
    }

    if (name.length > BREADCRUMB_MAX_LENGTH) {
      warn(
        `Breadcrumb name exceeds ${BREADCRUMB_MAX_LENGTH} characters (it has ${name.length}): ${name}. It will be truncated.`,
      )
    }

    // Checks for both `null` and `undefined`.
    if ([undefined, null].includes(metadata as any)) {
      metadata = {}
    } else if (typeof metadata === 'string') {
      metadata = { message: metadata }
    } else if (typeof metadata !== 'object') {
      warn(`Breadcrumb metadata must be an object or string, got '${metadata}'. Discarding metadata.`)
      metadata = {}
    }

    const { type = 'manual', ...breadcrumbMetaData } = metadata
    this.breadcrumbs.push({
      name,
      type,
      metadata: breadcrumbMetaData,
    })
    while (this.breadcrumbs.length > 10) {
      this.breadcrumbs.shift()
    }
  }
}

/**
 * Configuration options for a CrashReporter client
 */
export class Configuration {
  private version: string
  readonly handlePromiseRejections: boolean
  readonly autoNotify: boolean

  constructor(public analytics: AnalyticsType) {
    // eslint-disable-next-line
    const metadata = require('../../package.json')
    this.version = metadata['version']
    this.autoNotify = true
    this.handlePromiseRejections = !__DEV__ // prefer banner in dev mode
  }

  toJSON = () => {
    return {
      autoNotify: this.autoNotify,
      version: this.version,
    }
  }
}

class HandledState {
  originalSeverity: 'error' | 'warning'
  unhandled: boolean
  severityReason: SeverityReason

  constructor(originalSeverity: 'error' | 'warning', unhandled: boolean, severityReason: SeverityReason) {
    this.originalSeverity = originalSeverity
    this.unhandled = unhandled
    this.severityReason = severityReason
  }
}

/**
 * A report generated from an error
 */
export class Report {
  private errorClass: string
  private errorMessage: string
  private context: string | undefined
  private groupingHash: string | undefined
  private metadata: { [key: string]: { [key: string]: string } }
  private stacktrace: string | undefined
  private user: object | undefined
  private severity: any
  private _handledState: any

  constructor(error: Error, _handledState: HandledState) {
    this.errorClass = error.constructor.name
    this.errorMessage = error.message
    this.context = undefined
    this.groupingHash = undefined
    this.metadata = {}
    this.stacktrace = error.stack
    this.user = {}

    if (!_handledState || !(_handledState instanceof HandledState)) {
      _handledState = new HandledState('warning', false, SeverityReason.handledException)
    }

    this.severity = _handledState.originalSeverity
    this._handledState = _handledState
  }

  /**
   * Attach additional diagnostic data to the report. The key/value pairs
   * are grouped into sections.
   */
  addMetadata = (section: string, key: string, value: string) => {
    if (!this.metadata[section]) {
      this.metadata[section] = {}
    }
    this.metadata[section][key] = value
  }

  toJSON(): any {
    if (!this._handledState || !(this._handledState instanceof HandledState)) {
      this._handledState = new HandledState('warning', false, SeverityReason.handledException)
    }
    // severityReason must be a string, and severity must match the original
    // state, otherwise we assume that the user has modified _handledState
    // in a callback
    const defaultSeverity = this._handledState.originalSeverity === this.severity
    const isValidReason = typeof this._handledState.severityReason === 'string'
    const severityType =
      defaultSeverity && isValidReason ? this._handledState.severityReason : 'userCallbackSetSeverity'

    // if unhandled not set, user has modified the report in a callback
    // or via notify, so default to false
    const isUnhandled = typeof this._handledState.unhandled === 'boolean' ? this._handledState.unhandled : false

    return {
      context: this.context,
      errorClass: this.errorClass,
      errorMessage: this.errorMessage,
      groupingHash: this.groupingHash,
      metadata: this.serializeMetadata(),
      severity: this.severity,
      stacktrace: this.stacktrace,
      user: this.user,
      defaultSeverity: defaultSeverity,
      unhandled: isUnhandled,
      severityReason: severityType,
    }
  }

  serializeMetadata(): object {
    return {
      author: this.metadata['author'],
      name: this.metadata['name'],
      version: this.metadata['version'],
    }
  }
}
