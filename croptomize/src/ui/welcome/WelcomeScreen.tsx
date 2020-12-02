//
//  src/ui/welcome/WelcomeScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import React from 'react'
import { StyleSheet, View, Linking, Image, Text } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { WelcomeComponentProps } from './WelcomeProps'
import { SafeAreaView, NavigationFocusInjectedProps } from 'react-navigation'
import { WelcomeSliderComponent } from './WelcomeSliderComponent'
import { AppColors } from '../styles/AppStyles'
import { AppNavigationSectionNames } from '../navigation/AppNavigationSectionNames'
import { Adjust, AdjustEvent } from 'react-native-adjust'
import { AppEventsLogger } from 'react-native-fbsdk'

interface WelcomeScreenState {
  index: number
  visible: boolean
}

const slides = [
  {
    title: 'Save Time!',
    message: 'Market Prices at a Glance.',
    key: 'save_time_slide',
    image: require('../../../assets/welcome-localized-pricing.png'),
  },
  {
    title: 'Easily Find Your',
    message: 'Local Prices!',
    key: 'local_prices_slize',
    image: require('../../../assets/welcome-adding-localized-pricing.png'),
  },
  {
    title: 'See the Price',
    message: 'Details You Need!',
    key: 'price_details_slide',
    image: require('../../../assets/welcome-price-details.png'),
  },
]

export class WelcomeScreen extends React.Component<
  WelcomeComponentProps & NavigationFocusInjectedProps,
  WelcomeScreenState
> {
  constructor(props: WelcomeComponentProps & NavigationFocusInjectedProps) {
    super(props)

    this.state = {
      index: 0,
      visible: false,
    }
  }

  nextPressed() {
    if (this.state.index <= 3) {
      this.setState({ index: this.state.index + 1 })
    } else if (this.state.index === 4) {
      this.startPressed()
    }
  }

  startPressed = () => {
    this.props.uiStore.setHasSeenWelcomeScreen(true)
    this.props.navigation.navigate(AppNavigationSectionNames.Auth)
    // if (this.props.uiStore.email) {
    //   this.props.navigation.navigate(AppNavigationSectionNames.App)
    // } else {
    //   this.props.navigation.navigate(AppNavigationSectionNames.Auth)
    // }
  }

  componentWillMount() {
    Adjust.trackEvent(new AdjustEvent('j1fyrl'))
    AppEventsLogger.logEvent('ViewOnboarding')

    this.props.uiStore.hasSeenWelcomeScreen().then(hasSeen => {
      if (hasSeen) {
        this.startPressed()
        return
      }

      this.setState({ visible: true })
    })
  }

  render() {
    if (!this.state.visible) {
      return null
    }

    return (
      <View style={styles.container}>
        <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Image source={require('../../../assets/croptomize-logomark.png')} style={styles.logoMark} />
            <AppIntroSlider
              renderItem={this.renderSlide}
              slides={slides}
              showSkipButton={true}
              renderNextButton={() => this.renderButton('NEXT')}
              renderSkipButton={() => this.renderButton('SKIP')}
              renderPrevButton={() => this.renderButton('PREV')}
              renderDoneButton={() => this.renderButton('START')}
              onDone={() => this.startPressed()}
              onSkip={() => this.startPressed()}
              dotStyle={styles.inactiveDotStyle}
              activeDotStyle={styles.activeDotStyle}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  }

  renderButton = (title: string) => {
    return (
      <View style={styles.buttonStyle}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    )
  }

  renderSlide = ({ item }: any) => {
    return (
      <WelcomeSliderComponent style={styles.pageStyle} title={item.title} message={item.message} image={item.image} />
    )
  }

  getStarted() {
    Linking.openURL('sms://?').catch(e => console.log("Can't open url: ", e))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: AppColors.backgroundCream,
  },
  pageStyle: {
    flexGrow: 1,
    margin: 66,
    justifyContent: 'center',
    marginBottom: 100,
  },
  logoMark: {
    width: 28,
    height: 28,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 29,
  },
  buttonStyle: {
    marginTop: 13,
  },
  buttonTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  inactiveDotStyle: {
    backgroundColor: 'transparent',
    borderColor: '#1A3E61',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginHorizontal: 4,
  },
  activeDotStyle: {
    backgroundColor: '#FFCE51',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginHorizontal: 4,
  },
})
