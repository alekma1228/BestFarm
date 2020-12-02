import { logger } from './logger'
import { Stripe } from 'stripe'

export const onStripeError = (error: Stripe.StripeError) => {
  logger(error.raw, error.type, true)
  // handle errors based on type
  switch (error.type) {
    case 'StripePermissionError':
      return `${error.type}: ${error.message}`
    default:
      return error.message
  }
}
