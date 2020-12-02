//
//  CreateAccountScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-04-04
//  Copyright © 2019 Croptomize. All Rights Reserved.

import React from 'react'
import { Text, StyleSheet, View, TextInput, Image, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'
import { AppColors } from '../styles/AppStyles'
import { PasswordProps } from './PasswordProps'
import { NavigationInjectedProps, SafeAreaView } from 'react-navigation'
import { AppNavigationSectionNames } from '../navigation/AppNavigationSectionNames'

interface CreateAccountState {
  firstName: string
  lastName: string
  email: string
  password: string
  error?: string | null
  disabled: boolean
  refresh: number
}

export class PasswordScreen extends React.Component<PasswordProps, CreateAccountState> {
  private inputB?: TextInput

  constructor(props: PasswordProps & NavigationInjectedProps) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      disabled: true,
      refresh: 0,
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
        <View style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Image
                source={require('../../../assets/chevron-left.png')}
                style={{ marginTop: 17, tintColor: '#1A3E61', height: 16, width: 10, marginLeft: 22 }}
              />
              <Image source={require('../../../assets/croptomize-logomark.png')} style={styles.logoMark} />
              <View style={{ marginRight: 32 }} />
            </View>
            <Text style={styles.createAccountTitle}>Password</Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 13,
                fontFamily: 'Montserrat-Medium',
                marginTop: 9,
                color: '#1A3E61',
                textAlign: 'center',
              }}
            >
              Enter the password you wish{'\n'}to use with Croptomize.
            </Text>
            <View style={styles.formInputContainer}>
              <TextInput
                placeholder="Password"
                onSubmitEditing={() => (this.inputB as any).focus()}
                autoCorrect={false}
                autoCapitalize={'none'}
                onChangeText={text => {
                  this.setState({ password: text }, () => this.passwordComplete())
                }}
                keyboardType={'default'}
                returnKeyType="next"
                style={styles.textInputStyle}
                placeholderTextColor={'#8C9EAF'}
              >
                {this.state.password}
              </TextInput>
            </View>
            <Text style={styles.passwordRequirement}>
              Must be: 8+ Characters inducing 1 uppercase, 1 lowercase, 1 Number, 1 Special.
            </Text>
            <Button
              title="Get Started"
              disabled={this.state.disabled}
              buttonStyle={{
                width: 327,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#FFCE51',
                marginTop: 22,
                alignSelf: 'center',
              }}
              titleStyle={{ color: '#1A3E61', fontFamily: 'Montserrat-Bold', fontSize: 15 }}
              disabledStyle={{ backgroundColor: '#FFE6A7' }}
              disabledTitleStyle={{ color: '#8C9EAF', fontFamily: 'Montserrat-Medium' }}
              onPress={() => this.props.navigation.navigate(AppNavigationSectionNames.MainApp)}
            />
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <View style={{ marginBottom: 17, flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ color: '#1A3E61', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>
                  Already have an account?{' '}
                </Text>
                <TouchableHighlight onPress={() => console.log('signin pressed')}>
                  <Text style={{ color: '#1A3E61', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>Sign in</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  passwordComplete(): boolean {
    if (
      this.state.password.length >= 8 &&
      /[a-z]/.test(this.state.password) &&
      /[A-Z]/.test(this.state.password) &&
      /[0-9]/.test(this.state.password) &&
      /[\!@#$%^&*()_+\-=\[\]{}|\\;':",./<>?]/.test(this.state.password)
    ) {
      this.setState({ disabled: false })
      return false
    } else {
      this.setState({ disabled: true })
      return true
    }
  }

  createAccountEnabled(): boolean {
    return (
      this.state.email.length >= 1 &&
      /^\S+@\S+\.\S+$/.test(this.state.email) &&
      /[a-z]/.test(this.state.password) &&
      /[A-Z]/.test(this.state.password) &&
      /[0-9]/.test(this.state.password) &&
      /[\!@#$%^&*()_+\-=\[\]{}|\\;':",./<>?]/.test(this.state.password) &&
      // (this.state.password.length >= 8) && // FIXME uncomment this line
      this.state.firstName.length >= 1 &&
      this.state.lastName.length >= 1
    )
  }

  /*This is just a test function, it will be deleted later on}*/
  createAccount() {
    console.log('create Account')
  }

  enableScroll(): boolean {
    return true
  }

  disableScroll(): boolean {
    return false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    color: AppColors.white,
    flex: 0,
  },
  logoMark: {
    marginTop: 17,
    alignSelf: 'center',
    height: 28,
    width: 28,
  },
  createAccountTitle: {
    color: '#1A3E61',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    marginTop: 28,
  },
  createAccountTexts: {
    color: AppColors.white,
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginRight: 10,
    marginTop: 20,
  },
  signInText: {
    color: AppColors.white,
    alignSelf: 'flex-start',
    fontSize: 18,
    marginLeft: 20,
  },
  inlineError: {
    color: AppColors.errorMessage,
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  createAccountContainerButtonStyle: {
    backgroundColor: AppColors.appPurple,
    alignSelf: 'stretch',
  },
  createAccountButtonStyle: {
    backgroundColor: AppColors.appPurple,
    height: 50,
  },
  createAccountButtonTextStyle: {
    fontSize: 18,
  },
  formInputContainer: {
    backgroundColor: '#F2F2E6',
    borderColor: '#86D0CA',
    height: 48,
    borderRadius: 10,
    marginLeft: 24,
    marginTop: 24,
    marginRight: 24,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  textInputStyle: {
    fontSize: 13,
    padding: 5,
    flex: 1,
    color: '#1A3E61',
    marginLeft: 15,
    fontFamily: 'Montserrat-Medium',
  },
  textInputSideIcon: {
    marginRight: 20,
    tintColor: AppColors.appPurple,
  },
  boldMini: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#1A3E61',
  },
  mini: { color: '#1A3E61', fontFamily: 'Montserrat-Medium', fontSize: 12, alignSelf: 'center', textAlign: 'center' },
  passwordRequirement: {
    textAlign: 'left',
    fontSize: 11,
    fontFamily: 'Montserrat-Light',
    color: '#1A3E61',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 5,
  },
})
