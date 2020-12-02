//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native'
import { CroptomizeSettingsProps } from './CroptomizeSettingsProps'
import { AppFonts } from '../styles/AppStyles'
import { AppNavigationSectionNames } from '../navigation/AppNavigationSectionNames'
import { Auth } from 'aws-amplify'
import { TeasersView } from '../components/Teasers'

interface CroptomizeSettingsComponentState {}

export class CroptomizeSettingsScreen extends React.Component<
  CroptomizeSettingsProps,
  CroptomizeSettingsComponentState
> {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.category}>Account</Text>
        <View style={styles.line} />
        <TouchableOpacity style={styles.cell}>
          <Text style={styles.info}>Manage My Subscription</Text>
          <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
        </TouchableOpacity> */}
        <View style={styles.line} />
        {this.props.uiStore.isFreeUser && (
          <TeasersView
            text={
              'Unlock full access to the Croptomize hedging model and CFO Lite, our farm revenue management software. Go to the Croptomize website to learn more.'
            }
          />
        )}
        <Text style={styles.category}>Legal</Text>
        <View style={styles.line} />
        <View style={{ backgroundColor: 'white' }}>
          <TouchableOpacity
            style={styles.cell}
            onPress={() => Linking.openURL('https://croptomize.com/terms-conditions/')}
          >
            <Text style={styles.info}>Terms of Service</Text>
            <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.halfLine} />
          <TouchableOpacity
            style={styles.cell}
            onPress={() => Linking.openURL('https://croptomize.com/privacy-policy/')}
          >
            <Text style={styles.info}>Privacy Policy</Text>
            <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <Text style={styles.category}>Croptomize Tutorials</Text>
        <View style={styles.line} />
        <View style={{ backgroundColor: 'white' }}>
          <TouchableOpacity style={styles.cell} onPress={() => this.showWelcomeScreen()}>
            <Text style={styles.info}>Intro Screen</Text>
            <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.halfLine} />
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.info}>Add a Crop</Text>
            <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.halfLine} />
          <TouchableOpacity style={styles.cell} onPress={() => this.showDeletingCropTutorial()}>
            <Text style={styles.info}>Deleting a Crop</Text>
            <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.halfLine} />
          <TouchableOpacity style={styles.cell} onPress={() => this.showUsingCroptomizeIntlligenceTutorial()}>
            <Text style={styles.info}>Using Croptomize intelligence</Text>
            <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.halfLine} />
          <TouchableOpacity style={styles.cell} onPress={() => this.showCFOTutorial()}>
            <Text style={styles.info}>Farm CFO</Text>
            <Image source={require('../../../assets/chevron-right.png')} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <TouchableOpacity style={[styles.cell, styles.signout]} onPress={() => this.signOut()}>
          <Text style={styles.info}>Sign Out</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <Text style={[{ marginTop: 20 }, styles.barchartText]}>All pricing data is provided by BarChart.com</Text>
        <Text style={[styles.barchartText]}>and is on a 10 minute delay</Text>
        <Text style={styles.appVersion}>App version 1.0</Text>
      </View>
    )
  }

  showWelcomeScreen = () => {
    this.props.uiStore.setHasSeenWelcomeScreen(false)
    this.props.navigation.navigate(AppNavigationSectionNames.Welcome)
  }
  showDeletingCropTutorial = () => {
    this.props.uiStore.setMarketFeedTutorialIndex(0)
    this.props.navigation.navigate(AppNavigationSectionNames.MarketInformation)
  }
  showUsingCroptomizeIntlligenceTutorial = () => {
    this.props.uiStore.setPriceCheckTutorialIndex(0)
    this.props.navigation.navigate(AppNavigationSectionNames.PriceCheck)
  }
  showCFOTutorial = () => {
    this.props.uiStore.setHasSeenCFOTutorial(false)
    this.props.navigation.navigate(AppNavigationSectionNames.CFODashboard)
  }

  signOut = () => {
    Auth.signOut()
      .then(() => {
        this.props.navigation.navigate(AppNavigationSectionNames.Auth)
      })
      .catch(() => {
        this.props.navigation.navigate(AppNavigationSectionNames.Auth)
      })
  }

  contactUs = () => {
    Linking.openURL('mailto:info@croptomize.com').catch(ex => console.log(ex))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F2F2E6',
  },
  category: {
    color: '#8C9EAF',
    fontSize: 13,
    fontFamily: AppFonts.subheading,
    marginLeft: 20,
    marginTop: 21,
    marginBottom: 5,
  },
  line: {
    backgroundColor: '#E8E5DC',
    height: 1,
  },
  cell: {
    backgroundColor: '#FCFAF3',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    color: '#1A3E61',
    fontSize: 12,
    fontFamily: AppFonts.subheading,
    marginLeft: 20,
  },
  arrow: {
    height: 12,
    width: 8,
    tintColor: '#00000040',
    marginRight: 24,
  },
  halfLine: {
    backgroundColor: '#E8E5DC',
    height: 1,
    marginLeft: 20,
  },
  appVersion: {
    color: '#8C9EAF',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: AppFonts.subheading,
  },
  barchartText: {
    color: '#8C9EAF',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: AppFonts.subheading,
  },
  signout: {
    justifyContent: 'center',
  },
})
