//
//  src/ui/welcome/WelcomeScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import React from 'react'
import { ViewProps, View, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { Text } from 'react-native-elements'
import { welcomeStyles } from './WelcomeSliderStyles'
import { AppFonts, AppColors } from '../styles/AppStyles'

interface WelcomeSliderProps extends ViewProps {
  title: string
  message: string
  image: ImageSourcePropType
}

export class WelcomeSliderComponent extends React.Component<WelcomeSliderProps> {
  render() {
    return (
      <View style={[welcomeStyles.container, this.props.style]}>
        {/* Welcome Image */}
        <Text style={styles.header}>{this.props.title}</Text>
        <Text style={styles.header}>{this.props.message}</Text>
        <Image source={this.props.image} style={styles.image} />
        <View style={{ height: 80 }} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: AppColors.navy,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: AppFonts.semiBold,
  },
  image: {
    marginTop: 25,
    marginBottom: 25,
  },
})
