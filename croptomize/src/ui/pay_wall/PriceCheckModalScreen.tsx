//
//  src/ui/pay_wall/PriceCheckModalScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-23
//  Copyright © 2019 croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { PriceCheckModalProps } from './PriceCheckModalProps'

interface PriceCheckModalComponentState {}

export class PriceCheckModalScreen extends React.Component<PriceCheckModalProps, PriceCheckModalComponentState> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Implement This</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})
