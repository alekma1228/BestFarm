//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-19
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, Image, ImageBackground, Modal, TouchableOpacity } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { PriceCalculationProps } from './PriceCalculationProps'
import { AppFonts } from '../styles/AppStyles'
import { Button } from 'react-native-elements'
import PriceCheckTutorial from './PriceCheckTutorial'

interface PriceCalculationComponentState {}

interface ProbabilityData {
  text: string
  icon: any
  word: string
}

export class PriceCalculationScreen extends React.Component<PriceCalculationProps, PriceCalculationComponentState> {
  render() {
    const probabilityData = this.getProbabilityData()
    const tutorialPageIndex = this.props.uiStore.priceCheckTutorialIndex + 1

    return (
      <Modal visible={this.props.visible} transparent={true} animationType="fade">
        <BlurView blurType="light" style={styles.contentWrap}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.onDismiss()}>
              <Image source={require('../../../assets/close.png')} style={styles.exitIcon} />
            </TouchableOpacity>
            <Text style={styles.big}>Price Check Results</Text>
            <ImageBackground source={probabilityData.icon} style={styles.probabilityImage}>
              <Text style={styles.percent}>{probabilityData.word}</Text>
            </ImageBackground>
            <Text style={styles.message}>{probabilityData.text}</Text>
            <Button
              title={'What is the Croptomize frame?'}
              icon={
                <Image
                  source={require('../../../assets/more-info.png')}
                  style={{ tintColor: '#1A3E61', height: 15, width: 15, marginRight: 7 }}
                />
              }
              containerStyle={{
                borderColor: '#1A3E61',
                borderWidth: 3,
                height: 44,
                marginLeft: 22,
                marginRight: 25,
                marginTop: 30,
                marginBottom: 24,
                borderRadius: 3,
              }}
              titleStyle={{ color: '#1A3E61', fontFamily: 'Montserrat-Medium', fontSize: 13 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              onPress={() => this.showFrame()}
            />
            <View style={{ flex: 1 }} />
            <Button
              onPress={this.changePrice}
              buttonStyle={styles.newPrice}
              titleStyle={styles.newPriceTitle}
              title={'Enter New Price'}
            />
          </View>
          {tutorialPageIndex === 4 && (
            <PriceCheckTutorial
              pageIndex={tutorialPageIndex}
              probabilityIcon={probabilityData.icon}
              probabilityWord={probabilityData.word}
              probabilityText={probabilityData.text}
              onNext={() => this.onNextTutorial()}
              onExit={() => this.onNextTutorial()}
            />
          )}
        </BlurView>
      </Modal>
    )
  }

  onNextTutorial() {
    this.props.onNextTutorial()
  }

  showFrame() {
    this.props.showFrame()
  }

  changePrice = () => {
    this.props.onDismiss()
  }

  getProbabilityData = (): ProbabilityData => {
    // Probability here is the probability that we will hit that value or lower (the cumulative distribution function on the distribution).
    // For higher than 50, 1 - value (the survival function) gives the probablility we will hit that value or higher. For lower than 50 the value can be used directly.

    let text, icon, word

    if (this.props.probability > 99.9968) {
      text =
        'Based on our frame, that price is highly improbable. The probability of prices being in this range are less than 1 in 500.'
      icon = require('../../../assets/low-probability.png')
      word = 'Improbable'
    } else if (this.props.probability > 99.865) {
      text = 'Based on our frame, that price is highly unlikely. There is a 1 in 40 chance of prices in this range.'
      icon = require('../../../assets/low-probability.png')
      word = 'Highly Unlikely'
    } else if (this.props.probability > 97.724) {
      text =
        'Based on our frame, that price is unlikely. The statistics indicate it is more probable prices will be lower.'
      icon = require('../../../assets/low-probability.png')
      word = 'Unlikely'
    } else if (this.props.probability > 84.134) {
      text = 'Based on our frame, that price is likely, but it is on the high side.'
      icon = require('../../../assets/medium-probability.png')
      word = 'Above Average'
    } else if (this.props.probability >= 15.865) {
      text = "Based on our frame, that price is likely. It is near the average for this commodity's projections."
      icon = require('../../../assets/high-probability.png')
      word = 'Likely'
    } else if (this.props.probability > 2.275) {
      text = 'Based on our frame, that price is likely, but it is on the low side.'
      icon = require('../../../assets/medium-probability.png')
      word = 'Below Average'
    } else if (this.props.probability > 0.135) {
      text =
        'Based on our frame, that price is unlikely. The statistics indicate it is more probable prices will be higher.'
      icon = require('../../../assets/low-probability.png')
      word = 'Unlikely'
    } else if (this.props.probability > 0.003) {
      text = 'Based on our frame, that price is highly unlikely. There is a 1 in 40 chance of prices in this range.'
      icon = require('../../../assets/low-probability.png')
      word = 'Highly Unlikely'
    } else {
      text =
        'Based on our frame, that price is highly improbable. The probability of prices being in this range are less than 1 in 500.'
      icon = require('../../../assets/low-probability.png')
      word = 'Improbable'
    }

    return {
      text,
      icon,
      word,
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FCFAF3',
    marginHorizontal: 24,
    marginTop: 50,
    marginBottom: 80,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0.6,
    shadowRadius: 5,
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
    fontSize: 20,
    fontFamily: AppFonts.heading,
    color: '#1A3E61',
    marginBottom: 40,
  },
  bold: {
    fontFamily: AppFonts.heading,
  },
  message: {
    marginTop: 30,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: AppFonts.subheading,
    color: '#1A3E61',
    marginHorizontal: 38,
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
