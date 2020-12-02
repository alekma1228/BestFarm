import { Handler, DynamoDBStreamEvent } from 'aws-lambda'
import AWS from 'aws-sdk'
import 'source-map-support/register'

export const handler: Handler<DynamoDBStreamEvent> = async (event, _context, callback) => {
  const cognitoISP = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  })

  for (const record of event.Records) {
    try {
      console.log(record.eventID)
      console.log(record.eventName)
      console.log('DynamoDB Record: %j', record.dynamodb)

      const userEmailAttribute =
        record.eventName === 'INSERT' ? record.dynamodb.NewImage?.memberEmail : record.dynamodb.OldImage?.memberEmail
      const userEmail = userEmailAttribute.S

      if (!userEmail) {
        console.log('ERROR: email not found in user record; malformed record: ', record)
        continue
      }

      console.log(`Finding user with email: ${userEmail}`)

      const userRequest: AWS.CognitoIdentityServiceProvider.AdminGetUserRequest = {
        UserPoolId: process.env.AUTH_CROPTOMIZEIOSANALYTICS_USERPOOLID,
        Username: userEmail,
      }

      const user = await cognitoISP.adminGetUser(userRequest).promise()

      if (!user) {
        console.log(`No user found for email ${userEmail}. Account may not exist yet. Skipping record.`)
        continue
      }

      console.log('Found user:', JSON.stringify(user))

      const params = {
        GroupName: 'PaidUsers',
        UserPoolId: process.env.AUTH_CROPTOMIZEIOSANALYTICS_USERPOOLID,
        Username: userEmail,
      }

      // TODO: handle cases where the user is a part of multiple accounts

      switch (record.eventName) {
        case 'INSERT':
          console.log(`Adding ${userEmail} to PaidUsers group using: ${JSON.stringify(params)}`)
          const result = await cognitoISP.adminAddUserToGroup(params).promise()
          console.log('RESULT:', result)
          break

        case 'REMOVE':
          console.log(`Removing ${userEmail} from PaidUsers group`)
          await cognitoISP.adminRemoveUserFromGroup(params).promise()
          break

        case 'MODIFY':
          if (
            record.dynamodb.NewImage &&
            record.dynamodb.OldImage &&
            record.dynamodb.NewImage.memberEmail.S !== userEmail
          ) {
            console.log(
              `User email changed from ${userEmail} to ${record.dynamodb.NewImage.memberEmail.S}. Updating user groups.`,
            )
            await cognitoISP.adminRemoveUserFromGroup(params).promise()
            await cognitoISP
              .adminAddUserToGroup({ ...params, Username: record.dynamodb.NewImage.memberEmail.S })
              .promise()
          }

          break
      }
    } catch (ex) {
      console.log('Error while processing record: ', ex, record)
    }
  }

  callback(null, event)
}
