//
//  CreateAccountProps.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-04-04
//  Copyright © 2019 Croptomize. All Rights Reserved.

export interface LoginComponentProps {
  initialEmail?: string
  initialPassword?: string
  initialFirstName?: string
  initialLastName?: string
  emailError?: string
  busy: boolean
}

export interface LoginActions {
  login: (firstName: string, lastName: string, email: string, password: string) => void
}

export type LoginProps = LoginComponentProps & LoginActions
