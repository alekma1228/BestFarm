//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-19
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, Image, Modal } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { LocalizedPricingProps } from './LocalizedPricingProps'
import { Button } from 'react-native-elements'
import { AppFonts } from '../styles/AppStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface LocalizedPricingComponentState {}

export class LocalizedPricingScreen extends React.Component<LocalizedPricingProps, LocalizedPricingComponentState> {
  render() {
    return (
      <Modal visible={this.props.visible} transparent={true} animationType="fade">
        <BlurView blurType="light" style={styles.contentWrap}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.onDismiss()}>
              <Image source={require('../../../assets/close.png')} style={styles.exitIcon} />
            </TouchableOpacity>
            <Text style={styles.big}>Localized Pricing</Text>
            <Text style={styles.message}>Get all the pricing data you need, right here, in the palm of your hand.</Text>
            <View style={{ flex: 1 }} />
            <Button
              buttonStyle={styles.newPrice}
              titleStyle={styles.newPriceTitle}
              title={'Unlock with Free Trial'}
              onPress={this.props.onSubscribe}
            />
          </View>
        </BlurView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FCFAF3',
    marginHorizontal: 24,
    height: 236,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0.6,
    shadowRadius: 5,
    marginTop: 150,
  },
  exitIcon: {
    height: 13,
    width: 13,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 25,
  },
  big: {
    fontFamily: AppFonts.heading,
    fontSize: 28,
    color: '#1A3E61',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 26,
  },
  probabilityImage: {
    height: 149,
    width: 149,
    alignSelf: 'center',
    marginTop: 32,
    justifyContent: 'center',
  },
  percent: {
    textAlign: 'center',
    fontSize: 38,
    fontFamily: AppFonts.heading,
    color: '#1A3E61',
  },
  bold: {
    fontFamily: AppFonts.heading,
  },
  message: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: AppFonts.subheading,
    color: '#1A3E61',
    marginHorizontal: 30,
    marginTop: 19,
  },
  newPrice: {
    height: 54,
    backgroundColor: '#FFCE51',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  newPriceTitle: {
    fontSize: 15,
    color: '#1A3E61',
    fontFamily: AppFonts.heading,
    textAlign: 'center',
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
