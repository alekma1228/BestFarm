// tslint:disable
// this is an auto generated file. This will be overwritten

export const getTeamMember = /* GraphQL */ `
  query GetTeamMember($owner: String!, $memberEmail: String!) {
    getTeamMember(owner: $owner, memberEmail: $memberEmail) {
      owner
      memberEmail
      isPaid
    }
  }
`;
export const listTeamMembers = /* GraphQL */ `
  query ListTeamMembers(
    $owner: String
    $memberEmail: ModelStringKeyConditionInput
    $filter: ModelTeamMemberFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeamMembers(
      owner: $owner
      memberEmail: $memberEmail
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        memberEmail
        isPaid
      }
      nextToken
    }
  }
`;
export const getCroptomizeUser = /* GraphQL */ `
  query GetCroptomizeUser($owner: String!, $email: String!) {
    getCroptomizeUser(owner: $owner, email: $email) {
      owner
      email
      numberOfSeats
      stripeCustomerId
      hasSubscription
      subscriptionDate
    }
  }
`;
export const listCroptomizeUsers = /* GraphQL */ `
  query ListCroptomizeUsers(
    $owner: String
    $email: ModelStringKeyConditionInput
    $filter: ModelCroptomizeUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCroptomizeUsers(
      owner: $owner
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        email
        numberOfSeats
        stripeCustomerId
        hasSubscription
        subscriptionDate
      }
      nextToken
    }
  }
`;
export const teamMemberByEmail = /* GraphQL */ `
  query TeamMemberByEmail(
    $memberEmail: String
    $sortDirection: ModelSortDirection
    $filter: ModelTeamMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamMemberByEmail(
      memberEmail: $memberEmail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        owner
        memberEmail
        isPaid
      }
      nextToken
    }
  }
`;
