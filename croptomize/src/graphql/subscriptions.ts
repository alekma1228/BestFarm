// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateTeamMember = /* GraphQL */ `
  subscription OnCreateTeamMember($owner: String!) {
    onCreateTeamMember(owner: $owner) {
      owner
      memberEmail
      isPaid
    }
  }
`;
export const onUpdateTeamMember = /* GraphQL */ `
  subscription OnUpdateTeamMember($owner: String!) {
    onUpdateTeamMember(owner: $owner) {
      owner
      memberEmail
      isPaid
    }
  }
`;
export const onDeleteTeamMember = /* GraphQL */ `
  subscription OnDeleteTeamMember($owner: String!) {
    onDeleteTeamMember(owner: $owner) {
      owner
      memberEmail
      isPaid
    }
  }
`;
export const onCreateCroptomizeUser = /* GraphQL */ `
  subscription OnCreateCroptomizeUser($owner: String!) {
    onCreateCroptomizeUser(owner: $owner) {
      owner
      email
      numberOfSeats
      stripeCustomerId
      hasSubscription
      subscriptionDate
    }
  }
`;
export const onUpdateCroptomizeUser = /* GraphQL */ `
  subscription OnUpdateCroptomizeUser($owner: String!) {
    onUpdateCroptomizeUser(owner: $owner) {
      owner
      email
      numberOfSeats
      stripeCustomerId
      hasSubscription
      subscriptionDate
    }
  }
`;
export const onDeleteCroptomizeUser = /* GraphQL */ `
  subscription OnDeleteCroptomizeUser($owner: String!) {
    onDeleteCroptomizeUser(owner: $owner) {
      owner
      email
      numberOfSeats
      stripeCustomerId
      hasSubscription
      subscriptionDate
    }
  }
`;
