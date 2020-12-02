import React, { useState, useEffect } from 'react'
import {
  AmplifyTheme,
  Authenticator,
  AuthState,
  SignIn,
  ConfirmSignIn,
  RequireNewPassword,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  Loading,
} from 'aws-amplify-react-native'
import { AppColors } from '../styles/AppStyles'
import { View, Image, Text, Keyboard } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { Auth, Hub } from 'aws-amplify'
import { LoggedInScreenNameKey } from './AuthScreenNames'
import { CustomSignUp } from './CustomSignUp'

interface HeaderProps {
  text: string
}

const Header = (props: HeaderProps) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../../assets/croptomize-full-logo.png')}
        style={{
          marginTop: 48,
          alignSelf: 'center',
          height: 70,
          width: 95,
        }}
      />
      <Text
        style={{
          margin: 20,
          fontFamily: 'Montserrat-Medium',
          color: AppColors.navy,
          fontSize: 22,
        }}
      >
        {props.text}
      </Text>
    </View>
  )
}

const buttonDefaults = {
  width: 327,
  borderRadius: 22,
  backgroundColor: '#FFCE51',
  alignSelf: 'center',
  marginTop: 10,
}

const theme = {
  ...AmplifyTheme,
  sectionHeader: {
    height: 0,
  },
  section: {
    ...AmplifyTheme.section,
  },
  button: {
    ...AmplifyTheme.button,
    ...buttonDefaults,
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
    color: AppColors.navy,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    ...buttonDefaults,
    backgroundColor: '#FFE6A7',
  },
  sectionFooter: {
    ...AmplifyTheme.sectionFooter,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: AppColors.navy,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  input: {
    height: 44,
    fontSize: 13,
    padding: 5,
    color: '#1A3E61',
    fontFamily: 'Montserrat-Medium',
    backgroundColor: '#F2F2E6',
    borderColor: '#86D0CA',
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 0,
    marginRight: 5,
    marginBottom: 20,
  },
  formField: {
    flexDirection: 'column',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorRowText: {
    fontFamily: 'Montserrat-Medium',
    color: AppColors.errorMessage,
    marginLeft: 10,
  },
}

const headerTextForAuthState = (authState: AuthState) => {
  switch (authState) {
    case 'signIn':
      return 'Welcome Back'
    case 'forgotPassword':
      return 'Welcome Back'
    default:
      return 'Create Your Account'
  }
}

const handleAuthChange = (capsule: any) => {
  const { channel } = capsule
  if (channel === 'auth') {
    Keyboard.dismiss()
  }
}

export const AuthRoot = (props: NavigationInjectedProps) => {
  const [authState, setAuthState] = useState('signUp' as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(_user => {
        props.navigation.navigate(props.navigation.getParam(LoggedInScreenNameKey))
      })
      .catch(_ex => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    Hub.listen('auth', handleAuthChange)

    return () => Hub.remove('auth', handleAuthChange)
  }, [])

  if (authState === 'signedIn' || authState === 'signedUp') {
    props.navigation.navigate(props.navigation.getParam(LoggedInScreenNameKey))
  }

  if (loading) {
    return <View />
  }

  return (
    <View style={{ flexGrow: 1 }}>
      <Header text={headerTextForAuthState(authState)} />
      <Authenticator
        usernameAttributes="email"
        onStateChange={(authState: AuthState) => {
          setAuthState(authState)
          Keyboard.dismiss()
        }}
        theme={theme}
        hideDefault={true}
      >
        <SignIn />
        <ConfirmSignIn />
        <RequireNewPassword />
        <CustomSignUp
          signUpConfig={{
            hiddenDefaults: ['phone_number'],
          }}
        />
        <ConfirmSignUp />
        <VerifyContact />
        <ForgotPassword />
        <Loading />
      </Authenticator>
    </View>
  )
}
