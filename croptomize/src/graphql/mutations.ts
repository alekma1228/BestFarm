// tslint:disable
// this is an auto generated file. This will be overwritten

export const createTeamMember = /* GraphQL */ `
  mutation CreateTeamMember(
    $input: CreateTeamMemberInput!
    $condition: ModelTeamMemberConditionInput
  ) {
    createTeamMember(input: $input, condition: $condition) {
      owner
      memberEmail
      isPaid
    }
  }
`;
export const updateTeamMember = /* GraphQL */ `
  mutation UpdateTeamMember(
    $input: UpdateTeamMemberInput!
    $condition: ModelTeamMemberConditionInput
  ) {
    updateTeamMember(input: $input, condition: $condition) {
      owner
      memberEmail
      isPaid
    }
  }
`;
export const deleteTeamMember = /* GraphQL */ `
  mutation DeleteTeamMember(
    $input: DeleteTeamMemberInput!
    $condition: ModelTeamMemberConditionInput
  ) {
    deleteTeamMember(input: $input, condition: $condition) {
      owner
      memberEmail
      isPaid
    }
  }
`;
export const createCroptomizeUser = /* GraphQL */ `
  mutation CreateCroptomizeUser(
    $input: CreateCroptomizeUserInput!
    $condition: ModelCroptomizeUserConditionInput
  ) {
    createCroptomizeUser(input: $input, condition: $condition) {
      owner
      email
      numberOfSeats
      stripeCustomerId
      hasSubscription
      subscriptionDate
    }
  }
`;
export const updateCroptomizeUser = /* GraphQL */ `
  mutation UpdateCroptomizeUser(
    $input: UpdateCroptomizeUserInput!
    $condition: ModelCroptomizeUserConditionInput
  ) {
    updateCroptomizeUser(input: $input, condition: $condition) {
      owner
      email
      numberOfSeats
      stripeCustomerId
      hasSubscription
      subscriptionDate
    }
  }
`;
export const deleteCroptomizeUser = /* GraphQL */ `
  mutation DeleteCroptomizeUser(
    $input: DeleteCroptomizeUserInput!
    $condition: ModelCroptomizeUserConditionInput
  ) {
    deleteCroptomizeUser(input: $input, condition: $condition) {
      owner
      email
      numberOfSeats
      stripeCustomerId
      hasSubscription
      subscriptionDate
    }
  }
`;
