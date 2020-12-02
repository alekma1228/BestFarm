import os
from mailchimp3 import MailChimp

MAILCHIMP_API_KEY = os.getenv('MAILCHIMP_API_KEY')
AUDIENCE_ID = os.getenv('AUDIENCE_ID')
STAGE = os.getenv('STAGE')


def run(event, context):
    params = event.get('queryStringParameters', {})
    email = params.get('email')

    if not email:
        print('Missing parameters, Required: [email]. Found: ')
        print(f'email: {email}')

        return {
            'statusCode': 400,
        }

    client = MailChimp(mc_api=MAILCHIMP_API_KEY)

    client.lists.members.create(AUDIENCE_ID, {
        'email_address': email,
        'status': 'subscribed',
    })

    return {
        'statusCode': 200,
    }
