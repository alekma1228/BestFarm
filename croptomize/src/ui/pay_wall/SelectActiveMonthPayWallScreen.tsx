//  Created by Modern Logic on 2019-07-16
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import { SelectActiveMonthPayWallProps } from './SelectActiveMonthPayWallProps'
import { Button } from 'react-native-elements'
import { AppFonts } from '../styles/AppStyles'
import { RoundedTopView } from '../components/RoundedTopView'

interface SelectActiveMonthPaywallComponentState {}

export class SelectActiveMonthPayWallScreen extends React.Component<
  SelectActiveMonthPayWallProps,
  SelectActiveMonthPaywallComponentState
> {
  render() {
    return (
      <RoundedTopView title={'Select Active Month'}>
        <View
          style={{
            marginHorizontal: 20,
            height: 50,
            marginTop: 7,
            backgroundColor: '#FFCE51',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.activeMonth}>July 2019</Text>
          <Text style={styles.activeMonth}>$4.07/bu</Text>
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
          onPress={() => this.props.onSubscribe()}
        />
        <FlatList
          data={[
            { year: '2019', month: 'December', price: '$4.02' },
            { year: '2020', month: 'March', price: '$4.14' },
            { year: '2020', month: 'June', price: '$4.34' },
            { year: '2020', month: 'December', price: '$4.54' },
            { year: '2021', month: 'March', price: '$4.22' },
          ]}
          keyExtractor={item => `${item.month}_${item.year}`}
          renderItem={({ item }) => (
            <View
              style={{
                marginHorizontal: 20,
                height: 50,
                backgroundColor: '#47648080',
                marginTop: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <Text style={styles.lockedMonths}>
                {item.month} {item.year}
              </Text>
              <Text style={styles.lockedMonths}>{item.price}/bu</Text>
            </View>
          )}
        />
      </RoundedTopView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
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
