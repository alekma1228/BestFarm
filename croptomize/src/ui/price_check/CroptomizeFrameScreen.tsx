//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, Image, ScrollView, Linking } from 'react-native'
import { CroptomizeFrameProps } from './CroptomizeFrameProps'
import { AppFonts } from '../styles/AppStyles'
import { Button } from 'react-native-elements'
import { PriceCheckScreenNames } from '../navigation/PriceCheckScreenNames'

interface CroptomizeFrameComponentState {}

export class CroptomizeFrameScreen extends React.Component<CroptomizeFrameProps, CroptomizeFrameComponentState> {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>How it Works</Text>
          <Text style={styles.body}>
            Croptomize is driven by statistical frames that establish price projection curves for each commodity
            contract, a year in advance. For example, the current Frame for the December 2019 Corn prices on the Chicago
            Board of Trade (CBOT) was published in December of 2018.{'\n'}
            {'\n'}The Croptomize Frames are generated using over 40 years of market data and other information relevant
            to trading and commodity prices. The Frames set the “white lines” of the road ahead, helping guide marketing
            and risk management decisions.
          </Text>
          <Text style={styles.title}>The Frame</Text>
          <Text style={styles.body}>
            The graph below illustrates the probability commodity prices will reach various levels based on CBOT
            pricing.
          </Text>
          <Image source={require('../../../assets/frame.png')} style={styles.image} />
          <Text style={styles.body}>
            The green shaded areas reflect the highest probability, meaning there is a 68% chance that the commodity
            prices will fall within this range. The yellow shaded areas are slightly less probable at 27%, while the red
            shaded areas are even less probable at 5%.{'\n'}
            {'\n'}There is a chance that commodity prices will fall outside the shaded areas of the graph, but the
            probability is less than 3%.
          </Text>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title={'Got It!'}
            onPress={() => this.props.navigation.navigate(PriceCheckScreenNames.PriceCheck)}
          />
          <Button
            buttonStyle={styles.button2}
            titleStyle={styles.buttonTitle}
            title={'Learn More'}
            onPress={() => Linking.openURL('https://www.croptomize.com/pricing')}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#FCFAF3',
  },
  title: {
    fontSize: 22,
    fontFamily: AppFonts.button,
    color: '#1A3E61',
    marginTop: 42,
    marginLeft: 20,
    marginRight: 21,
  },
  body: {
    fontSize: 14,
    fontFamily: AppFonts.body,
    color: '#1A3E61',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 21,
    lineHeight: 20,
  },
  image: {
    height: 400,
    width: 480,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 26,
  },
  button: {
    width: 224,
    height: 44,
    backgroundColor: '#FFCE51',
    borderRadius: 22,
    padding: 0,
    marginTop: 58,
    alignSelf: 'center',
  },
  buttonTitle: {
    fontSize: 15,
    color: '#1A3E61',
    fontFamily: AppFonts.button,
  },
  button2: {
    backgroundColor: 'transparent',
    marginTop: 29,
    alignSelf: 'center',
    marginBottom: 60,
  },
})
