import { Handler, CognitoUserPoolTriggerEvent } from 'aws-lambda'
import 'source-map-support/register'
import Mailchimp from 'mailchimp-api-v3'

export const handler: Handler<CognitoUserPoolTriggerEvent> = async (event, _context, callback) => {
  console.log(
    'event: ',
    event,
    'request: ',
    event.request,
    'userAttributes:',
    event.request.userAttributes,
    'email: ',
    event.request.userAttributes.email,
  )

  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.AUDIENCE_ID
  const email = event.request.userAttributes.email

  if (!apiKey) {
    console.log('ERROR: no api key found')
    callback(null, event)
    return
  }

  if (!audienceId) {
    console.log('ERROR: no audience id found')
    callback(null, event)
    return
  }

  if (!email) {
    console.log('ERROR: no email found')
    callback(null, event)
    return
  }

  const mailchimp = new Mailchimp(apiKey)

  await mailchimp.post({
    path: `/lists/${audienceId}/members`,
    body: {
      email_address: event.request.userAttributes.email,
      status: 'subscribed',
    },
  })

  callback(null, event)
}
