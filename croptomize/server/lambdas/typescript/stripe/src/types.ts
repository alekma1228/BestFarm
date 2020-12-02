export type TEventParams = {
  email: string
  sub: string
  numberOfSeats: number
  stripeCardToken: string
  promoCode?: string
}
export type TUser = {
  sub: string
  email_verified: boolean
  phone_number_verified: boolean
  phone_number: string
  email: string
  // Username from cognito
  userId: string
  enabled: boolean
}

export type TDynamoTable = {
  Item: {
    owner: { S: string }
    memberEmail: { S: string }
    stripeCustomerId: { S: string }
  }
}
export type TDynamoUser = {
  owner: string
  memberEmail: string
  stripeCustomerId: string
}

export type TData = { sub: string; email: string }
