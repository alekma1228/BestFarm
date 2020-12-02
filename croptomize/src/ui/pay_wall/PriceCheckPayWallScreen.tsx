//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import { PriceCheckPayWallProps } from './PriceCheckPayWallProps'
import { Button } from 'react-native-elements'
import { AppFonts } from '../styles/AppStyles'

interface PriceCheckPayWallComponentState {}

export class PriceCheckPayWallScreen extends React.Component<PriceCheckPayWallProps, PriceCheckPayWallComponentState> {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#1A3E61', borderTopRightRadius: 20, borderTopLeftRadius: 20, flex: 1 }}>
          <Text
            style={{ color: 'white', fontFamily: AppFonts.button, fontSize: 18, marginTop: 20, textAlign: 'center' }}
          >
            Select Croptomize Frame
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              height: 50,
              marginTop: 10,
              backgroundColor: '#FFCE51',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.activeMonth}>July 2019</Text>
          </View>
          <Text
            style={{
              marginTop: 15,
              textAlign: 'center',
              fontSize: 17,
              fontFamily: AppFonts.subheading,
              color: 'white',
              marginHorizontal: 56,
            }}
          >
            Unlock all Future Pricing with <Text style={{ fontFamily: AppFonts.heading }}>Croptomize Pro!</Text>
          </Text>
          <Button
            buttonStyle={{
              marginTop: 12,
              marginHorizontal: 96,
              height: 40,
              backgroundColor: '#86D0CA',
              borderRadius: 20,
              marginBottom: 13,
            }}
            title={'Subscribe Now'}
            titleStyle={{ fontSize: 15, fontFamily: AppFonts.heading, color: '#1A3E61' }}
            onPress={this.props.onSubscribe}
          />
          <FlatList
            data={[
              { year: '2019', month: 'December' },
              { year: '2020', month: 'March' },
              { year: '2020', month: 'June' },
              { year: '2020', month: 'December' },
              { year: '2021', month: 'March' },
            ]}
            keyExtractor={item => `${item.month}_${item.year}`}
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: 20,
                  height: 50,
                  backgroundColor: '#47648080',
                  marginTop: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
              >
                <Text style={styles.lockedMonths}>
                  {item.month} {item.year}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  activeMonth: {
    color: '#1A3E61',
    fontFamily: AppFonts.button,
    fontSize: 15,
    marginHorizontal: 20,
  },
  lockedMonths: {
    color: '#8C9EAF',
    fontSize: 15,
    fontFamily: AppFonts.button,
    marginHorizontal: 15,
  },
})
