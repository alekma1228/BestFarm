//
//  CreateAccountScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-04-04
//  Copyright © 2019 Croptomize. All Rights Reserved.

import React from 'react'
import { Text, StyleSheet, View, TextInput, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { AppColors } from '../styles/AppStyles'
import { SmsVerificationProps } from './SmsVerificationProps'
import { NavigationInjectedProps, SafeAreaView } from 'react-navigation'
import { AuthScreenNames } from './AuthScreenNames'

interface SmsVerificationState {
  code?: string
  error?: string
  disabled: boolean
}

export class SmsVerificationScreen extends React.Component<SmsVerificationProps, SmsVerificationState> {
  private inputB?: TextInput

  constructor(props: SmsVerificationProps & NavigationInjectedProps) {
    super(props)
    this.state = {
      disabled: true,
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
        <View style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
          <View style={styles.container}>
            <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1 }}>
              <Image source={require('../../../assets/croptomize-full-logo.png')} style={styles.logoMark} />
              <Text style={styles.createAccountTitle}>SMS Verification</Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 13,
                  fontFamily: 'Montserrat-Medium',
                  marginTop: 8,
                  color: '#1A3E61',
                  textAlign: 'center',
                }}
              >
                We just send a verification code to
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 13,
                  textDecorationLine: 'underline',
                  fontFamily: 'Montserrat-Bold',
                  marginTop: 8,
                  color: '#1A3E61',
                  textAlign: 'center',
                }}
              >
                {this.props.phoneNumber}
              </Text>
              <View style={styles.formInputContainer}>
                <TextInput
                  placeholder="Verification Code"
                  onSubmitEditing={() => (this.inputB as any).focus()}
                  onChangeText={text => {
                    this.setState({ code: text }, () => this.checkCode())
                  }}
                  keyboardType={'numeric'}
                  returnKeyType="next"
                  style={styles.textInputStyle}
                  placeholderTextColor={'#8C9EAF'}
                ></TextInput>
              </View>
              <Button
                title="Continue"
                disabled={this.state.disabled}
                buttonStyle={{
                  width: 327,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#FFCE51',
                  marginTop: 21,
                  alignSelf: 'center',
                }}
                titleStyle={{ color: '#1A3E61', fontFamily: 'Montserrat-Bold', fontSize: 15 }}
                disabledStyle={{ backgroundColor: '#FFE6A7' }}
                disabledTitleStyle={{ color: '#8C9EAF', fontFamily: 'Montserrat-Medium' }}
                onPress={() => this.props.navigation.navigate(AuthScreenNames.FullName)}
              />
              <Text style={[styles.mini, { marginTop: 17 }]}>If you don&lsquo;t receive the code in 30 seconds</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text
                  style={[styles.boldMini, { textDecorationLine: 'underline' }]}
                  onPress={() => console.log('Resend pressed')}
                >
                  Tap here
                </Text>
                <Text style={styles.mini}> and resend it.</Text>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  checkCode() {
    // TODO: use the actual verification code length here
    if (this.state.code && this.state.code.length >= 5) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
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
  mini: {
    color: '#1A3E61',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
  },
})
