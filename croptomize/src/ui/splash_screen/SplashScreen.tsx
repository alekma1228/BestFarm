//
//  SplashScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import React from 'react'
import { SplashScreenProps } from './SplashScreenProps'
import { StyleSheet, View } from 'react-native'
import { Image } from 'react-native-elements'
import { AppColors } from '../styles/AppStyles'

export class SplashScreen extends React.Component<SplashScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/croptomize-full-logo.png')}
          style={{ height: 170, width: 230, alignSelf: 'center' }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFAF3',
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMark: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: 225,
    height: 170,
  },
  header: {
    color: AppColors.white,
    alignSelf: 'center',
    flex: 0,
    fontSize: 20,
    marginTop: 10,
  },
})
