import AWS from 'aws-sdk'
import { TUser, TData, TDynamoUser } from './types'
import { isEmpty } from 'lodash'
import { UpdateItemInput } from 'aws-sdk/clients/dynamodb'
import moment from 'moment'

/*
 * Cognito
 * */
const { USER_POOL_ID } = process.env as { USER_POOL_ID: string }
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
})
export const auth = async (email: string) => {
  const userRequest: AWS.CognitoIdentityServiceProvider.AdminGetUserRequest = {
    UserPoolId: USER_POOL_ID,
    Username: email,
  }

  const user = await cognito.adminGetUser(userRequest).promise()
  if (!user) {
    return null
  }
  const mappedUser: any = {} as any
  user.UserAttributes?.forEach(u => {
    mappedUser[u.Name] = u.Value
    if (u.Name === 'email_verified' || u.Name === 'phone_number_verified') {
      mappedUser[u.Name] = u.Value === 'true' ? true : false
    }
  })
  mappedUser.userId = user.Username
  mappedUser.enabled = user.Enabled
  return mappedUser as TUser
}

export const addUserToPaidGroup = async (email: string) => {
  try {
    const params: AWS.CognitoIdentityServiceProvider.AdminAddUserToGroupRequest = {
      GroupName: 'PaidUsers',
      UserPoolId: USER_POOL_ID,
      Username: email,
    }
    return await cognito.adminAddUserToGroup(params).promise()
  } catch (e) {
    return 'Cognito group add Error'
  }
}

/*
 * Dynamo DB
 * */
const dynamo = new AWS.DynamoDB()
export const checkDB = async (data: TData): Promise<string | TDynamoUser> => {
  try {
    const tableName = await findTable()
    const member = await dynamo.getItem(findQuery(tableName, data)).promise()
    if (isEmpty(member)) {
      // doesnt return the created member for some reason
      await dynamo.putItem(createQuery(tableName, data)).promise()
      // so loop back
      return (await checkDB(data)) as any
    }
    const parsed: TDynamoUser = {} as any
    parsed.owner = member.Item?.owner.S as string
    parsed.memberEmail = member.Item?.memberEmail.S as string
    parsed.stripeCustomerId = (member.Item?.stripeCustomerId?.S as string) || ''
    return parsed
  } catch (e) {
    return e.message
  }
}

const findTable = async () => {
  const tables = await dynamo.listTables().promise()
  if (!tables.TableNames || !tables.TableNames.length) {
    throw new Error('Table not found')
  }
  return tables.TableNames.filter(table => table.includes('TeamMember'))[0]
}

export const updateDB = async (user: TDynamoUser, stripeCustomerId: string, numberOfSeats: number | null = null) => {
  try {
    const tableName = await findTable()
    const query = numberOfSeats
      ? updateSubQuery(tableName, user, numberOfSeats)
      : updateQuery(tableName, user, stripeCustomerId)
    await dynamo.updateItem(query).promise()
    return null
  } catch (e) {
    return e.message
  }
}

// helpers
const findQuery = (TableName: string, { sub, email }: TData) => ({
  TableName,
  Key: {
    owner: { S: sub },
    memberEmail: { S: email },
  },
})
const createQuery = (TableName: string, { sub, email }: TData) => ({
  TableName,
  Item: {
    owner: { S: sub },
    memberEmail: { S: email },
    stripeCustomerId: { S: 'xxxx' },
  },
})
const updateSubQuery = (
  TableName: string,
  { memberEmail, owner }: TDynamoUser,
  numberOfSeats: number,
): UpdateItemInput => ({
  TableName,
  Key: {
    owner: { S: owner },
    memberEmail: { S: memberEmail },
  },
  UpdateExpression: 'set numberOfSeats = :n, subscriptionDate = :d, hasSubscription = :h',
  ExpressionAttributeValues: {
    ':n': { N: String(numberOfSeats) },
    ':d': { S: moment().format('YYYY-MM-DDThh:mm:ss.sssZ') },
    ':h': { BOOL: true },
  },
})
const updateQuery = (
  TableName: string,
  { memberEmail, owner }: TDynamoUser,
  stripeCustomerId: string,
): UpdateItemInput => ({
  TableName,
  Key: {
    owner: { S: owner },
    memberEmail: { S: memberEmail },
  },
  UpdateExpression: 'set stripeCustomerId = :x',
  ExpressionAttributeValues: {
    ':x': { S: stripeCustomerId },
  },
})
