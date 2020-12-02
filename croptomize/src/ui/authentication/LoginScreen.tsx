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
import { LoginProps } from './LoginProps'
import { NavigationInjectedProps, SafeAreaView } from 'react-navigation'

interface LoginState {
  firstName: string
  lastName: string
  phoneNumber: string
  password: string
  error?: string | null
  disabled: boolean
  phoneFocus: boolean
  passFocus: boolean
}

export class LoginScreen extends React.Component<LoginProps, LoginState> {
  private inputB?: TextInput

  constructor(props: LoginProps & NavigationInjectedProps) {
    super(props)
    this.state = {
      firstName: this.props.initialFirstName || '',
      lastName: this.props.initialLastName || '',
      phoneNumber: this.props.initialEmail || '',
      password: this.props.initialPassword || '',
      disabled: true,
      phoneFocus: false,
      passFocus: false,
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
        <View style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
          <View style={styles.container}>
            <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1 }}>
              <Image source={require('../../../assets/croptomize-full-logo.png')} style={styles.logoMark} />
              <Text style={styles.createAccountTitle}>Welcome Back</Text>
              <View style={[styles.formInputContainer, { borderColor: this.state.phoneFocus ? '#86D0CA' : '#E8E5DC' }]}>
                <TextInput
                  placeholder="Phone Number"
                  onChangeText={text => {
                    this.setState({ phoneNumber: text }, () => this.numberComplete())
                  }}
                  keyboardType={'numeric'}
                  returnKeyType="done"
                  style={styles.textInputStyle}
                  placeholderTextColor={'#8C9EAF'}
                  onSubmitEditing={() => (this.inputB as any).focus()}
                  onFocus={() => this.setState({ phoneFocus: true })}
                  onBlur={() => this.setState({ phoneFocus: false })}
                >
                  {this.state.phoneNumber}
                </TextInput>
              </View>
              <View style={[styles.formInputContainer, { borderColor: this.state.passFocus ? '#86D0CA' : '#E8E5DC' }]}>
                <TextInput
                  placeholder="Password"
                  onChangeText={text => {
                    this.setState({ password: text }, () => this.numberComplete())
                  }}
                  keyboardType={'default'}
                  secureTextEntry={true}
                  returnKeyType="next"
                  style={styles.textInputStyle}
                  placeholderTextColor={'#8C9EAF'}
                  autoCorrect={false}
                  ref={input => (this.inputB = input as TextInput)}
                  onFocus={() => this.setState({ passFocus: true })}
                  onBlur={() => this.setState({ passFocus: false })}
                >
                  {this.state.password}
                </TextInput>
              </View>
              <Button
                title="Continue"
                disabled={this.state.disabled}
                buttonStyle={styles.button}
                titleStyle={{ color: '#1A3E61', fontFamily: 'Montserrat-Bold', fontSize: 15 }}
                disabledStyle={{ backgroundColor: '#FFE6A7' }}
                disabledTitleStyle={{ color: '#8C9EAF', fontFamily: 'Montserrat-Medium' }}
              />
              <Text
                style={[styles.boldMini, { textDecorationLine: 'underline' }]}
                onPress={() => console.log('TOS pressed')}
              >
                {' '}
                Lost Password?{' '}
              </Text>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ margin: 17, flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={{ color: '#1A3E61', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>
                    Don&lsquo;t have an account?{' '}
                  </Text>
                  <TouchableHighlight onPress={() => console.log('register pressed')}>
                    <Text style={{ color: '#1A3E61', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>Register Now</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  numberComplete(): boolean {
    if (this.state.phoneNumber.length === 10 && this.state.password.length > 0) {
      this.setState({ disabled: false })
      return false
    } else {
      this.setState({ disabled: true })
      return true
    }
  }

  /*This is just a test function, it will be deleted later on}*/
  login() {
    this.props.login(this.state.firstName, this.state.lastName, this.state.phoneNumber, this.state.password)
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
    marginTop: 48,
    alignSelf: 'center',
    height: 70,
    width: 95,
  },
  createAccountTitle: {
    color: '#1A3E61',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    marginLeft: 20,
    marginTop: 14,
    marginBottom: 7,
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
    borderColor: '#E8E5DC',
    height: 48,
    borderRadius: 10,
    marginLeft: 24,
    marginTop: 10,
    marginRight: 24,
    alignSelf: 'center',
    borderWidth: 1,
    width: '90%',
  },
  textInputStyle: {
    fontSize: 13,
    padding: 5,
    flex: 1,
    color: '#1A3E61',
    marginLeft: 15,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'left',
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
  mini: {
    color: '#1A3E61',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    width: '90%',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFCE51',
    margin: 21,
    alignSelf: 'center',
  },
})
