//
//  CreateAccountScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-04-04
//  Copyright © 2019 Croptomize. All Rights Reserved.

import React from 'react'
import { Text, StyleSheet, View, TextInput, Image, Linking } from 'react-native'
import { Button } from 'react-native-elements'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { EmailProps } from './EmailProps'
import { NavigationInjectedProps, SafeAreaView } from 'react-navigation'
import { AppNavigationSectionNames } from '../navigation/AppNavigationSectionNames'
import { Adjust, AdjustEvent } from 'react-native-adjust'
import { AppEventsLogger } from 'react-native-fbsdk'
import styled from 'styled-components/native'

interface EmailState {
  email?: string
  error?: string
  disabled: boolean
}

const EmailTester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

export class EmailScreen extends React.Component<EmailProps, EmailState> {
  private inputB?: TextInput

  constructor(props: EmailProps & NavigationInjectedProps) {
    super(props)
    this.state = {
      disabled: true,
    }
  }

  componentDidMount() {
    Adjust.trackEvent(new AdjustEvent('94fxqn'))
    AppEventsLogger.logEvent('ViewEmailScreen')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
        <View style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
          <View style={styles.container}>
            <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1, alignItems: 'center' }}>
              <Image source={require('../../../assets/croptomize-full-logo.png')} style={styles.logoMark} />
              <Text style={styles.createAccountTitle}>Welcome to Croptomize</Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 13,
                  fontFamily: 'Montserrat-Medium',
                  marginTop: 8,
                  color: '#1A3E61',
                  textAlign: 'center',
                }}
              ></Text>
              <EmailText>Email Address:</EmailText>
              <View style={styles.formInputContainer}>
                <TextInput
                  placeholder="Enter your email to continue"
                  onSubmitEditing={() => (this.inputB as any).focus()}
                  onChangeText={text => {
                    this.setState({ email: text }, () => this.checkEmail())
                  }}
                  keyboardType={'email-address'}
                  returnKeyType="next"
                  style={styles.textInputStyle}
                  placeholderTextColor={AppColors.lightGreyText}
                ></TextInput>
              </View>
              <WhyWeAskText>
                Croptomize is free to use. We only ask for your email to share occasional product updates.
              </WhyWeAskText>
              <Button
                title="Register"
                disabled={this.state.disabled}
                buttonStyle={{
                  width: 327,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#FFCE51',
                  marginTop: 21,
                  marginBottom: 20,
                  alignSelf: 'center',
                }}
                titleStyle={{ color: AppColors.navy, fontFamily: AppFonts.bold, fontSize: 15 }}
                disabledStyle={{ backgroundColor: '#FFE6A7' }}
                disabledTitleStyle={{ color: AppColors.lightGreyText, fontFamily: AppFonts.medium }}
                onPress={() => this.setEmail()}
              />
              <WeCareText>We really care about privacy. See our</WeCareText>
              <WeCareText>
                <BoldText onPress={() => this.showTerms()}>Terms of Service</BoldText> and{' '}
                <BoldText onPress={() => this.showPrivacyPolicy()}>Privacy Policy</BoldText> for more details.
              </WeCareText>
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  checkEmail() {
    this.setState({ disabled: !this.emailIsValid(this.state.email) })
  }

  showTerms = () => {
    Linking.openURL('https://croptomize.com/terms-conditions/')
  }

  showPrivacyPolicy = () => {
    Linking.openURL('https://croptomize.com/privacy-policy/')
  }

  emailIsValid = (email?: string) => {
    // From https://github.com/manishsaraan/email-validator/ (Unlicense)
    if (!email) return false

    if (email.length > 254) return false

    const valid = EmailTester.test(email)
    if (!valid) return false

    const parts = email.split('@')
    if (parts[0].length > 64) return false

    const domainParts = parts[1].split('.')

    if (domainParts.some(() => parts.length > 63)) {
      return false
    }

    return true
  }

  setEmail = () => {
    if (!this.state.email) {
      return
    }

    this.setState({ disabled: true })

    Adjust.trackEvent(new AdjustEvent('vfvakx'))
    AppEventsLogger.logEvent('SetEmail')

    this.props.uiStore
      .setEmail(this.state.email)
      .then(() => this.props.navigation.navigate(AppNavigationSectionNames.MarketInformation))
      .catch(ex => {
        this.setState({ disabled: false })
        console.log(ex)
      })
  }
}

const EmailText = styled.Text`
  font-family: ${AppFonts.semiBold};
  font-size: 13px;
  color: ${AppColors.navy}
  margin-left: 24px;
  align-self: stretch;
`

const WhyWeAskText = styled.Text`
  font-family: ${AppFonts.body};
  font-size: 12px;
  color: ${AppColors.navy}
  text-align: center;
  width: 80%;
`

const WeCareText = styled.Text`
  font-family: ${AppFonts.body};
  font-size: 12px;
  color: ${AppColors.navy}
  text-align: center;
  width: 90%;
  margin-bottom: 2px;
`

const BoldText = styled(WeCareText)`
  font-family: ${AppFonts.semiBold};
  text-decoration: underline;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
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
  formInputContainer: {
    backgroundColor: '#F2F2E6',
    borderColor: '#E8E5DC',
    height: 48,
    borderRadius: 10,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 10,
    marginBottom: 10,
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
})
