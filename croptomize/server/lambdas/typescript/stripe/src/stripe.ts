import Stripe from 'stripe'
import key from './credentials'
import { TDynamoUser } from './types'
import { onStripeError } from './error.handler'
import { updateDB } from './auth'
import { logger } from './logger'

const stripe = new Stripe(key.STRIPE_SECRET_KEY, { apiVersion: '2020-03-02' })

const { STRIPE_PRICING_PLAN_ID } = process.env as any

export const checkStripeCustomer = async (user: TDynamoUser, cardToken: string) => {
  let customer: Stripe.Customer | Stripe.DeletedCustomer
  try {
    customer =
      // xxxx = newly created, no stripe account yet
      user.stripeCustomerId === 'xxxx'
        ? await stripe.customers.create({ email: user.memberEmail })
        : await stripe.customers.retrieve(user.stripeCustomerId)
  } catch (e) {
    // StripePermissionError === Customer Not found, might have been deleted from the website
    if (!noCustomerError(e)) {
      return onStripeError(e)
    }
    customer = await stripe.customers.create({ email: user.memberEmail })
  }
  // failed === error string
  // attachPm fails first, update doesnt run
  const failed = (await attachSourceToCustomer(customer.id, cardToken)) || (await updateDB(user, customer.id))
  return failed ? failed : customer
}
const attachSourceToCustomer = async (customerId: string, cardToken: string) => {
  try {
    await stripe.customers.createSource(customerId, { source: cardToken })
    return null
  } catch (e) {
    // card token nsent has already been used
    if (e.type === 'StripeInvalidRequestError' && e.code === 'token_already_used') {
      return null
    }
    return onStripeError(e)
  }
}
export const manageSubscription = async (
  user: TDynamoUser,
  customer: Stripe.Customer,
  numberOfSeats: number,
): Promise<string | Stripe.Subscription> => {
  try {
    const prevSub = hasSubscription(customer)
    const prevNumberOfSeats = prevSub?.quantity ?? 0
    let subscription: Stripe.Subscription | null = null
    // no subscription, create one (assumes is not possible to create a subscription of 0 amount)
    if (prevNumberOfSeats === 0) {
      subscription = await stripe.subscriptions.create(subcriptionParams(customer.id, numberOfSeats))
    }
    // Update since subscription changed
    if (prevNumberOfSeats !== numberOfSeats) {
      subscription = await stripe.subscriptions.update(prevSub.id, subUpdateParams(prevSub, numberOfSeats))
    }
    if (subscription) {
      const invoice = await sendInvoice(customer, subscription)
      await updateDB(user, '', numberOfSeats)
      logger(invoice, 'INVOICE')
      return subscription
    }
    // do nothing subscription remains the same
    return prevSub
  } catch (e) {
    return onStripeError(e)
  }
}

const sendInvoice = (customer: Stripe.Customer, sub: Stripe.Subscription) =>
  stripe.invoices.create({
    customer: customer.id,
    subscription: sub.id,
    auto_advance: true,
    description: 'Subscription Updated',
  })

const hasSubscription = (customer: Stripe.Customer) => {
  const data = customer.subscriptions?.data || []
  return data.filter(s => s.plan?.id === STRIPE_PRICING_PLAN_ID)[0]
}

const subcriptionParams = (id: string, seats: number): Stripe.SubscriptionCreateParams => ({
  customer: id,
  items: [
    {
      plan: STRIPE_PRICING_PLAN_ID as string,
      quantity: seats,
    },
  ],
})
const subUpdateParams = (sub: Stripe.Subscription, quantity: number): Stripe.SubscriptionUpdateParams => {
  // updates subscription to only one Item, which should always be the case
  // Item === the plan, with specified amount
  const item = sub.items.data.filter(i => i.plan.id === STRIPE_PRICING_PLAN_ID)[0]
  return {
    items: [{ id: item.id, plan: item.plan.id, quantity }],
  }
}
const noCustomerError = (e: any) =>
  // invalid customer id string
  e.type === 'StripePermissionError' ||
  // deleted in stripe but not in DynamoDB
  (e.type === 'StripeInvalidRequestError' && (e.message as string).includes('No such customer'))
