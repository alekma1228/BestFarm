//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-18
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SubscriptionProps } from './SubscriptionProps'
import { AppFonts } from '../styles/AppStyles'
import { Button } from 'react-native-elements'
import { MarketInformationScreenNames } from '../navigation/MarketInformationScreenNames'

interface SubscriptionComponentState {
  subscriptionType: string
}

export class SubscriptionScreen extends React.Component<SubscriptionProps, SubscriptionComponentState> {
  constructor(props: Readonly<SubscriptionProps>) {
    super(props)
    this.state = { subscriptionType: 'trial' }
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#F2F2E6' }}>
        <View style={styles.container}>
          <View style={styles.blueBackground}>
            <View
              style={{
                position: 'absolute',
                top: 177,
                height: 100,
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity onPress={() => this.setState({ subscriptionType: 'trial' })}>
                <View
                  style={[styles.subscriptionBox, { borderWidth: this.state.subscriptionType === 'trial' ? 3 : 0 }]}
                >
                  <Text style={styles.subscriptionName}>7 DAY TRIAL</Text>
                  <Text style={styles.price}>FREE</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: AppFonts.body,
                      color: '#91A2B2',
                      textAlign: 'center',
                      marginTop: 16,
                    }}
                  >
                    Then $14.99/mo
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ subscriptionType: 'monthly' })}>
                <View
                  style={[styles.subscriptionBox, { borderWidth: this.state.subscriptionType === 'monthly' ? 3 : 0 }]}
                >
                  <Text style={styles.subscriptionName}>MONTHLY</Text>
                  <Text style={styles.price}>$14.99/mo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ subscriptionType: 'annual' })}>
                <View
                  style={[styles.subscriptionBox, { borderWidth: this.state.subscriptionType === 'annual' ? 3 : 0 }]}
                >
                  <Text style={styles.subscriptionName}>ANNUAL</Text>
                  <Text style={styles.price}>$149.99/yr</Text>
                  <View
                    style={{
                      height: 18,
                      width: 79,
                      backgroundColor: '#86D0CA',
                      alignSelf: 'center',
                      marginTop: 16,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: AppFonts.subheading,
                        color: 'white',
                        textAlign: 'center',
                        marginTop: 1.5,
                      }}
                    >
                      Save 16%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(MarketInformationScreenNames.MarketFeed)}>
                <Image source={require('../../../assets/close.png')} style={styles.exitButton} />
              </TouchableOpacity>
              <Text style={styles.restore}>restore</Text>
            </View>
            <Image source={require('../../../assets/croptomize-pro.png')} style={styles.cropPro} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 7 }}>
              <Text style={styles.croptomize}>Croptomize</Text>
              <View style={styles.proBox}>
                <Text style={styles.pro}>PRO</Text>
              </View>
            </View>
            <Text style={styles.description}>Get access to more features with Croptomize Pro.</Text>
          </View>
          <View style={styles.whiteBox}>
            <View style={{ flexDirection: 'row', marginTop: 31, marginRight: 20 }}>
              <Image source={require('../../../assets/checkmark.png')} style={styles.checkmark} />
              <Text style={styles.header}>Access To Every Basis</Text>
            </View>
            <Text style={styles.info}>Get all the pricing data you need, right here, in the palm of your hand.</Text>
            <View style={{ flexDirection: 'row', marginTop: 25, marginRight: 20 }}>
              <Image source={require('../../../assets/checkmark.png')} style={styles.checkmark} />
              <Text style={styles.header}>Access To All Futures</Text>
            </View>
            <Text style={styles.info}>
              Get all the active months and futures data you need, right here, in the palm of your hand.
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20, marginRight: 20 }}>
              <Image source={require('../../../assets/checkmark.png')} style={styles.checkmark} />
              <Text style={styles.header}>Access To Price Checker</Text>
            </View>
            <Text style={styles.info}>
              Validate your market intuition with the Croptomize Frame through the use of market analytics and
              historical data.
            </Text>
            <View style={{ height: 30 }} />
          </View>
          <Button
            onPress={this.subscribe}
            buttonStyle={styles.confirmSubscription}
            titleStyle={styles.confirmTitle}
            title={'Confirm Subscription'}
          />
          <Text style={{ fontSize: 15, color: '#1A3E61', fontFamily: AppFonts.heading, marginLeft: 28, marginTop: 14 }}>
            Recurring billing, cancel anytime
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#8C9EAF',
              marginLeft: 28,
              marginTop: 4,
              fontFamily: AppFonts.subheading,
              marginRight: 28,
            }}
          >
            If you choose to purchase Croptomize Pro, payment will be charged to your iTunes account, and your account
            will be charged for renewal within 24 hours prior to the end of the current period. Auto-renewal may be
            turned off at any time by going to your settings in the iTunes store after purchase
          </Text>
          <View style={{ height: 93 }} />
        </View>
      </ScrollView>
    )
  }

  subscribe = () => {
    this.props.analyticsService.record('SubscriptionScreen.subscribe')
    this.props.uiStore.finishSubscription()
    this.props.navigation.navigate(MarketInformationScreenNames.MarketFeed)
  }
  declineSubscription = () => {
    this.props.navigation.navigate(MarketInformationScreenNames.MarketFeed)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F2F2E6',
  },
  blueBackground: {
    backgroundColor: '#1A3E61',
    height: 233,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  exitButton: {
    height: 13,
    width: 13,
    marginLeft: 17,
    tintColor: 'white',
  },
  restore: {
    fontSize: 13,
    color: 'white',
    marginRight: 18,
    fontFamily: AppFonts.subheading,
  },
  cropPro: {
    marginTop: 13,
    alignSelf: 'center',
    height: 36,
    width: 36,
  },
  croptomize: {
    fontSize: 20,
    fontFamily: AppFonts.heading,
    color: 'white',
  },
  proBox: {
    height: 16,
    width: 49,
    backgroundColor: '#86D0CA',
    marginLeft: 7,
    borderRadius: 5,
    marginTop: 3,
  },
  pro: {
    fontSize: 13,
    fontFamily: AppFonts.heading,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    fontFamily: AppFonts.subheading,
    color: 'white',
    marginHorizontal: 92,
    textAlign: 'center',
    marginTop: 10,
  },
  whiteBox: {
    marginTop: 74,
    marginHorizontal: 28,
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 1,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  checkmark: {
    height: 14,
    width: 18,
    tintColor: '#FFD773',
    marginLeft: 14,
  },
  header: {
    marginLeft: 11,
    color: '#1A3E61',
    fontSize: 15,
    fontFamily: AppFonts.heading,
  },
  info: {
    color: '#8C9EAF',
    fontFamily: AppFonts.subheading,
    fontSize: 13,
    marginLeft: 43,
    marginTop: 3,
  },
  subscriptionBox: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: '#86D0CA',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  subscriptionName: {
    fontSize: 13,
    fontFamily: AppFonts.subheading,
    color: '#8C9EAF',
    marginTop: 11,
    textAlign: 'center',
  },
  price: {
    fontSize: 15,
    fontFamily: AppFonts.heading,
    color: '#1A3E61',
    marginTop: 13,
    textAlign: 'center',
  },
  confirmSubscription: {
    marginTop: 15,
    marginHorizontal: 24,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFCE51',
  },
  confirmTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: AppFonts.heading,
    color: '#1A3E61',
  },
})
