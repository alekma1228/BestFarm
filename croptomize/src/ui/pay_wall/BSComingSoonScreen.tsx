//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-19
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, Image, Modal } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { BSComingSoonProps } from './BSComingSoonProps'
import { AppFonts } from '../styles/AppStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface BSComingSoonComponentState {}

export class BSComingSoonScreen extends React.Component<BSComingSoonProps, BSComingSoonComponentState> {
  render() {
    return (
      <Modal visible={this.props.visible} transparent={true} animationType="fade">
        <BlurView blurType="light" style={styles.contentWrap}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.onDismiss()}>
              <Image source={require('../../../assets/close.png')} style={styles.exitIcon} />
            </TouchableOpacity>
            <Text style={[styles.big, styles.spacer]}>BS Checker</Text>
            <Text style={styles.big}>Coming Soon!</Text>
            <Text style={styles.message}>
              The BS checker allows you to test the prices that get thrown around on radio and TV and run them against
              real, statistical data from the Croptomize Frame.
            </Text>
            <Text style={styles.message}>
              Created using market data from the last 40 years to provide a statistical view of the market.
            </Text>
            <View style={{ flex: 1 }} />
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
    height: 400,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0.6,
    shadowRadius: 5,
    marginTop: 60,
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
  },
  spacer: {
    marginTop: 26,
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
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
