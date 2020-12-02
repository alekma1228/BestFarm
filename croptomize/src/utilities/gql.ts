import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api/lib/types'

type InputType<P> = {
  input: P
}

export async function gql<T extends object, P>(query: string, params?: P | InputType<P>): Promise<T | undefined> {
  const op = graphqlOperation(query, params)
  const queryResult = await (API.graphql(op) as Promise<GraphQLResult>)
  return queryResult.data as T | undefined
}
