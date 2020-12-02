import { Handler } from 'aws-lambda'
import { auth, checkDB, addUserToPaidGroup } from './auth'
import { logger } from './logger'
import { checkStripeCustomer, manageSubscription } from './stripe'
import { isString } from 'lodash'
import { TEventParams } from './types'
import Stripe from 'stripe'

export const stripe: Handler<TEventParams> = async (event, _, callback) => {
  const user = await auth(event.email)
  logger(user, 'USER')
  if (user === null) {
    return callback(new Error('User not found'))
  }
  const { sub, email } = user
  const db = await checkDB({ sub, email })
  logger(db, 'DYNAMO')
  if (isString(db)) {
    return callback(new Error(db))
  }
  const customer = (await checkStripeCustomer(db, event.stripeCardToken)) as Stripe.Customer
  logger(customer, 'CUSTOMER')
  if (isString(customer)) {
    return callback(new Error(customer))
  }
  const subscription = await manageSubscription(db, customer, event.numberOfSeats)
  logger(subscription, 'SUBSCRIPTION')
  if (isString(subscription)) {
    return callback(new Error(subscription))
  }
  const group = await addUserToPaidGroup(event.email)
  logger(group, 'COGNITO Group add')
  if (isString(group)) {
    return callback(new Error(group))
  }
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Subscription created/updated', subscription }),
  })
}
