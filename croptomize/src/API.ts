/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTeamMemberInput = {
  owner: string,
  memberEmail: string,
  isPaid?: boolean | null,
};

export type ModelTeamMemberConditionInput = {
  isPaid?: ModelBooleanInput | null,
  and?: Array< ModelTeamMemberConditionInput | null > | null,
  or?: Array< ModelTeamMemberConditionInput | null > | null,
  not?: ModelTeamMemberConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type UpdateTeamMemberInput = {
  owner: string,
  memberEmail: string,
  isPaid?: boolean | null,
};

export type DeleteTeamMemberInput = {
  owner: string,
  memberEmail: string,
};

export type CreateCroptomizeUserInput = {
  owner: string,
  email: string,
  numberOfSeats?: number | null,
  stripeCustomerId?: string | null,
  hasSubscription?: boolean | null,
  subscriptionDate?: string | null,
};

export type ModelCroptomizeUserConditionInput = {
  numberOfSeats?: ModelIntInput | null,
  stripeCustomerId?: ModelStringInput | null,
  hasSubscription?: ModelBooleanInput | null,
  subscriptionDate?: ModelStringInput | null,
  and?: Array< ModelCroptomizeUserConditionInput | null > | null,
  or?: Array< ModelCroptomizeUserConditionInput | null > | null,
  not?: ModelCroptomizeUserConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateCroptomizeUserInput = {
  owner: string,
  email: string,
  numberOfSeats?: number | null,
  stripeCustomerId?: string | null,
  hasSubscription?: boolean | null,
  subscriptionDate?: string | null,
};

export type DeleteCroptomizeUserInput = {
  owner: string,
  email: string,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelTeamMemberFilterInput = {
  owner?: ModelStringInput | null,
  memberEmail?: ModelStringInput | null,
  isPaid?: ModelBooleanInput | null,
  and?: Array< ModelTeamMemberFilterInput | null > | null,
  or?: Array< ModelTeamMemberFilterInput | null > | null,
  not?: ModelTeamMemberFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCroptomizeUserFilterInput = {
  owner?: ModelStringInput | null,
  email?: ModelStringInput | null,
  numberOfSeats?: ModelIntInput | null,
  stripeCustomerId?: ModelStringInput | null,
  hasSubscription?: ModelBooleanInput | null,
  subscriptionDate?: ModelStringInput | null,
  and?: Array< ModelCroptomizeUserFilterInput | null > | null,
  or?: Array< ModelCroptomizeUserFilterInput | null > | null,
  not?: ModelCroptomizeUserFilterInput | null,
};

export type CreateTeamMemberMutationVariables = {
  input: CreateTeamMemberInput,
  condition?: ModelTeamMemberConditionInput | null,
};

export type CreateTeamMemberMutation = {
  createTeamMember:  {
    __typename: "TeamMember",
    owner: string,
    memberEmail: string,
    isPaid: boolean | null,
  } | null,
};

export type UpdateTeamMemberMutationVariables = {
  input: UpdateTeamMemberInput,
  condition?: ModelTeamMemberConditionInput | null,
};

export type UpdateTeamMemberMutation = {
  updateTeamMember:  {
    __typename: "TeamMember",
    owner: string,
    memberEmail: string,
    isPaid: boolean | null,
  } | null,
};

export type DeleteTeamMemberMutationVariables = {
  input: DeleteTeamMemberInput,
  condition?: ModelTeamMemberConditionInput | null,
};

export type DeleteTeamMemberMutation = {
  deleteTeamMember:  {
    __typename: "TeamMember",
    owner: string,
    memberEmail: string,
    isPaid: boolean | null,
  } | null,
};

export type CreateCroptomizeUserMutationVariables = {
  input: CreateCroptomizeUserInput,
  condition?: ModelCroptomizeUserConditionInput | null,
};

export type CreateCroptomizeUserMutation = {
  createCroptomizeUser:  {
    __typename: "CroptomizeUser",
    owner: string,
    email: string,
    numberOfSeats: number | null,
    stripeCustomerId: string | null,
    hasSubscription: boolean | null,
    subscriptionDate: string | null,
  } | null,
};

export type UpdateCroptomizeUserMutationVariables = {
  input: UpdateCroptomizeUserInput,
  condition?: ModelCroptomizeUserConditionInput | null,
};

export type UpdateCroptomizeUserMutation = {
  updateCroptomizeUser:  {
    __typename: "CroptomizeUser",
    owner: string,
    email: string,
    numberOfSeats: number | null,
    stripeCustomerId: string | null,
    hasSubscription: boolean | null,
    subscriptionDate: string | null,
  } | null,
};

export type DeleteCroptomizeUserMutationVariables = {
  input: DeleteCroptomizeUserInput,
  condition?: ModelCroptomizeUserConditionInput | null,
};

export type DeleteCroptomizeUserMutation = {
  deleteCroptomizeUser:  {
    __typename: "CroptomizeUser",
    owner: string,
    email: string,
    numberOfSeats: number | null,
    stripeCustomerId: string | null,
    hasSubscription: boolean | null,
    subscriptionDate: string | null,
  } | null,
};

export type GetTeamMemberQueryVariables = {
  owner: string,
  memberEmail: string,
};

export type GetTeamMemberQuery = {
  getTeamMember:  {
    __typename: "TeamMember",
    owner: string,
    memberEmail: string,
    isPaid: boolean | null,
  } | null,
};

export type ListTeamMembersQueryVariables = {
  owner?: string | null,
  memberEmail?: ModelStringKeyConditionInput | null,
  filter?: ModelTeamMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTeamMembersQuery = {
  listTeamMembers:  {
    __typename: "ModelTeamMemberConnection",
    items:  Array< {
      __typename: "TeamMember",
      owner: string,
      memberEmail: string,
      isPaid: boolean | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCroptomizeUserQueryVariables = {
  owner: string,
  email: string,
};

export type GetCroptomizeUserQuery = {
  getCroptomizeUser:  {
    __typename: "CroptomizeUser",
    owner: string,
    email: string,
    numberOfSeats: number | null,
    stripeCustomerId: string | null,
    hasSubscription: boolean | null,
    subscriptionDate: string | null,
  } | null,
};

export type ListCroptomizeUsersQueryVariables = {
  owner?: string | null,
  email?: ModelStringKeyConditionInput | null,
  filter?: ModelCroptomizeUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCroptomizeUsersQuery = {
  listCroptomizeUsers:  {
    __typename: "ModelCroptomizeUserConnection",
    items:  Array< {
      __typename: "CroptomizeUser",
      owner: string,
      email: string,
      numberOfSeats: number | null,
      stripeCustomerId: string | null,
      hasSubscription: boolean | null,
      subscriptionDate: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type TeamMemberByEmailQueryVariables = {
  memberEmail?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTeamMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TeamMemberByEmailQuery = {
  teamMemberByEmail:  {
    __typename: "ModelTeamMemberConnection",
    items:  Array< {
      __typename: "TeamMember",
      owner: string,
      memberEmail: string,
      isPaid: boolean | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTeamMemberSubscriptionVariables = {
  owner: string,
};

export type OnCreateTeamMemberSubscription = {
  onCreateTeamMember:  {
    __typename: "TeamMember",
    owner: string,
    memberEmail: string,
    isPaid: boolean | null,
  } | null,
};

export type OnUpdateTeamMemberSubscriptionVariables = {
  owner: string,
};

export type OnUpdateTeamMemberSubscription = {
  onUpdateTeamMember:  {
    __typename: "TeamMember",
    owner: string,
    memberEmail: string,
    isPaid: boolean | null,
  } | null,
};

export type OnDeleteTeamMemberSubscriptionVariables = {
  owner: string,
};

export type OnDeleteTeamMemberSubscription = {
  onDeleteTeamMember:  {
    __typename: "TeamMember",
    owner: string,
    memberEmail: string,
    isPaid: boolean | null,
  } | null,
};

export type OnCreateCroptomizeUserSubscriptionVariables = {
  owner: string,
};

export type OnCreateCroptomizeUserSubscription = {
  onCreateCroptomizeUser:  {
    __typename: "CroptomizeUser",
    owner: string,
    email: string,
    numberOfSeats: number | null,
    stripeCustomerId: string | null,
    hasSubscription: boolean | null,
    subscriptionDate: string | null,
  } | null,
};

export type OnUpdateCroptomizeUserSubscriptionVariables = {
  owner: string,
};

export type OnUpdateCroptomizeUserSubscription = {
  onUpdateCroptomizeUser:  {
    __typename: "CroptomizeUser",
    owner: string,
    email: string,
    numberOfSeats: number | null,
    stripeCustomerId: string | null,
    hasSubscription: boolean | null,
    subscriptionDate: string | null,
  } | null,
};

export type OnDeleteCroptomizeUserSubscriptionVariables = {
  owner: string,
};

export type OnDeleteCroptomizeUserSubscription = {
  onDeleteCroptomizeUser:  {
    __typename: "CroptomizeUser",
    owner: string,
    email: string,
    numberOfSeats: number | null,
    stripeCustomerId: string | null,
    hasSubscription: boolean | null,
    subscriptionDate: string | null,
  } | null,
};
