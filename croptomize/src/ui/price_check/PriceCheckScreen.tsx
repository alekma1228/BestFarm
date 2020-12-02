//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-15
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { Text, StyleSheet, View, TextInput, SafeAreaView, KeyboardAvoidingView, Keyboard, FlatList } from 'react-native'
import { AppColors, AppFonts, AppButton, AppButtonText } from '../styles/AppStyles'
import { TextInputMask } from 'react-native-masked-text'
import { PriceCheckScreenNames } from '../navigation/PriceCheckScreenNames'
import { PayWallScreenNames } from '../navigation/PayWallNavigation'
import { PriceCalculationScreen } from './PriceCalculationScreen'
import { PriceCheckProps } from './PriceCheckProps'
import { CropType, getPriceCheckerDisplayNameForCropType } from '../../model/Symbols'
import { observer } from 'mobx-react'
import { SwipeableModal } from '../components/SwipeableModal'
import { PriceCheckPayWallScreen } from '../pay_wall/PriceCheckPayWallScreen'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { LoadingView } from '../components/LoadingView'
import { MainTabNames } from '../navigation/MainTabNames'
import { calculatedHeaderHeight } from '../../utilities/safe_area'
import { RoundedTopView } from '../components/RoundedTopView'
import { FrameDateOption } from '../../stores/UIStore'
import { DropDownButton } from '../components/DropDownButton'
import { ModalPopup } from '../components/ModalPopup'
import styled from 'styled-components/native'
import PriceCheckTutorial from './PriceCheckTutorial'
import { TeasersView } from '../components/Teasers'

interface PriceCheckState {
  priceCheckResultVisible: boolean
  estimatedPrice: string
  probability: number
  priceCheckPaywallVisible: boolean
  selectFrameMonthVisible: boolean
  selectCropVisible: boolean
  frameMissingErrorVisible: boolean
  tutorialPageIndex: number
}

@observer
export class PriceCheckScreen extends React.Component<PriceCheckProps, PriceCheckState> {
  private inputB?: TextInput
  constructor(props: PriceCheckProps) {
    super(props)
    this.state = {
      priceCheckResultVisible: false,
      priceCheckPaywallVisible: false,
      estimatedPrice: '',
      probability: 0.0,
      selectFrameMonthVisible: false,
      selectCropVisible: false,
      frameMissingErrorVisible: false,
      tutorialPageIndex: 5,
    }
  }
  componentDidMount() {
    this.setState({ tutorialPageIndex: this.props.uiStore.priceCheckTutorialIndex })
  }

  dismissComingSoon = () => {
    this.props.navigation.navigate(MainTabNames.MarketInformation)
  }

  render() {
    const dropDownText = getPriceCheckerDisplayNameForCropType(this.props.uiStore.priceCheckerCropType)
    const tutorialPageIndex = this.props.uiStore.priceCheckTutorialIndex + 1
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
        <ModalPopup
          visible={this.state.frameMissingErrorVisible}
          onDismiss={() => this.setState({ frameMissingErrorVisible: false })}
          title={'Missing Crop'}
          message={'The crop you selected is not available for analysis. Try a different crop or year.'}
          buttonText={'OK'}
        />
        <SwipeableModal
          onDismiss={() => this.setState({ priceCheckPaywallVisible: false })}
          visible={this.state.priceCheckPaywallVisible}
        >
          <PriceCheckPayWallScreen
            onSubscribe={() => this.props.navigation.navigate(PayWallScreenNames.Subscription)}
          />
        </SwipeableModal>
        <SwipeableModal
          onDismiss={() => this.setState({ selectFrameMonthVisible: false })}
          visible={this.state.selectFrameMonthVisible}
        >
          <RoundedTopView title="Select Month">
            <FlatList
              data={this.props.uiStore.selectableDatesForFrame}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => this.renderDateButton(item)}
            />
          </RoundedTopView>
        </SwipeableModal>
        <SwipeableModal
          onDismiss={() => this.setState({ selectCropVisible: false })}
          visible={this.state.selectCropVisible}
        >
          <RoundedTopView title="Select Crop">
            <FlatList
              data={Object.keys(CropType)}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => this.renderCropButton(item)}
            />
          </RoundedTopView>
        </SwipeableModal>
        <KeyboardAvoidingView keyboardVerticalOffset={calculatedHeaderHeight} behavior={'padding'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
            <View style={{ backgroundColor: '#F2F2E6', alignContent: 'center', paddingBottom: 15 }}>
              <BSCheckerText>B.S. Checker</BSCheckerText>
              <DropDownButton
                action={() => this.setState({ selectCropVisible: true })}
                text={dropDownText}
                style={styles.monthPicker}
              />
              {/* {!this.props.uiStore.isFreeUser && (
                <DropDownButton
                  action={() => this.setState({ selectFrameMonthVisible: true })}
                  text={`${this.props.uiStore.priceCheckerSelectedMonth.month} ${this.props.uiStore.priceCheckerSelectedMonth.year}`}
                  iconName={'calendar'}
                  style={styles.monthPicker}
                />
              )} */}
            </View>
            {this.props.uiStore.isFreeUser && (
              <TeasersView
                text={
                  'Did you know the Croptomize statistical frame can tell you when to hedge grain? Go to the Croptomize website to learn more.'
                }
              />
            )}

            <Text style={styles.priceCheckerLabel}>
              Enter a price to check against the Croptomize Frame projection:
            </Text>
            <View style={styles.formInputContainer}>
              <TextInputMask
                placeholder="$0.00"
                onEndEditing={() => Keyboard.dismiss()}
                options={{
                  precision: 2,
                  separator: '.',
                  delimiter: ',',
                  unit: '$',
                }}
                type={'money'}
                onSubmitEditing={() => (this.inputB as any).focus()}
                onFocus={() => this.setState({ estimatedPrice: '$0.00' })}
                onChangeText={(text: string) => this.setState({ estimatedPrice: text })}
                keyboardType={'numeric'}
                returnKeyType="next"
                style={[styles.textInputStyle, this.estimate() ? { color: AppColors.navy } : {}]}
                placeholderTextColor={'#8C9EAF'}
                value={this.state.estimatedPrice}
              ></TextInputMask>
            </View>
            {/* <Button
              title={'What is the Croptomize Frame?'}
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
                marginLeft: 46,
                marginRight: 49,
                marginTop: 16,
                borderRadius: 3,
              }}
              titleStyle={{ color: '#1A3E61', fontFamily: 'Montserrat-Medium', fontSize: 13 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              onPress={this.showFrame}
            /> */}
            {this.props.uiStore.loadingPriceCheck && <LoadingView />}

            <CheckPriceButton
              disabled={this.props.uiStore.loadingPriceCheck || !this.estimate()}
              onPress={() => this.checkPrice()}
            >
              <AppButtonText disabled={this.props.uiStore.loadingPriceCheck || !this.estimate()}>
                Check Price
              </AppButtonText>
            </CheckPriceButton>

            <View style={{ flex: 1 }} />
          </ScrollView>
        </KeyboardAvoidingView>
        <PriceCalculationScreen
          onDismiss={() => this.setState({ priceCheckResultVisible: false })}
          navigation={this.props.navigation}
          probability={this.state.probability}
          cropType={this.props.uiStore.priceCheckerCropType}
          cropMonth={this.props.uiStore.priceCheckerSelectedMonth.month}
          cropYear={this.props.uiStore.priceCheckerSelectedMonth.year}
          checkPrice={this.state.estimatedPrice}
          visible={this.state.priceCheckResultVisible}
          showFrame={this.showFrame}
          uiStore={this.props.uiStore}
          onNextTutorial={() => this.onNextTutorial()}
          tutorialPageIndex={tutorialPageIndex}
        ></PriceCalculationScreen>

        {tutorialPageIndex < 4 && !this.state.priceCheckResultVisible ? (
          <PriceCheckTutorial
            pageIndex={tutorialPageIndex}
            dropDownText={dropDownText}
            estimatePrice={this.state.estimatedPrice}
            onNext={() => this.onNextTutorial()}
            onExit={() => this.onExitTutorial()}
          />
        ) : null}
      </SafeAreaView>
    )
  }

  onNextTutorial() {
    const nextTutorialPageIndex = this.props.uiStore.priceCheckTutorialIndex + 1
    this.props.uiStore.setPriceCheckTutorialIndex(nextTutorialPageIndex)
    if (nextTutorialPageIndex === 2) {
      this.setState({ estimatedPrice: '$4.55', tutorialPageIndex: nextTutorialPageIndex })
    } else if (nextTutorialPageIndex === 4) {
      this.setState({ estimatedPrice: '$0.00', tutorialPageIndex: nextTutorialPageIndex })
    } else {
      this.setState({ tutorialPageIndex: nextTutorialPageIndex })
    }
    if (nextTutorialPageIndex === 3) {
      this.checkPrice()
    }
  }
  onExitTutorial() {
    this.props.uiStore.setPriceCheckTutorialIndex(5)
    this.setState({ estimatedPrice: '$0.00', tutorialPageIndex: 5 })
  }

  renderCropButton(cropType: string) {
    return (
      <TouchableOpacity
        onPress={() => this.selectCropType(cropType)}
        style={[
          styles.dateButton,
          { backgroundColor: this.props.uiStore.priceCheckerCropType === cropType ? AppColors.yellow : 'white' },
        ]}
      >
        <View>
          <View>
            <Text style={[styles.buttonTitle, styles.navyText]}>{getPriceCheckerDisplayNameForCropType(cropType)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  selectCropType(cropType: string) {
    this.setState({ selectCropVisible: false })
    this.props.uiStore.selectPriceCheckerCrop(cropType)
  }

  changeMonth = (dateOption: FrameDateOption) => {
    if (this.props.uiStore.isFreeUser) {
      this.props.analyticsService.record('PriceCheckScreen.changeMonth_isFreeUser')
      this.setState({ priceCheckPaywallVisible: true })
      return
    }

    this.setState({ selectFrameMonthVisible: false })
    this.props.uiStore.selectPriceCheckerDate(dateOption)

    this.props.analyticsService.record('PriceCheckScreen.changeMonth_isNotFreeUser')
  }

  checkPrice = () => {
    this.props.analyticsService.record('PriceCheckScreen.checkPrice', {
      estimatedPrice: this.state.estimatedPrice,
      crop: this.props.uiStore.priceCheckerCropType,
      currentMonth: this.props.uiStore.priceCheckerSelectedMonth.month,
      currentYear: this.props.uiStore.priceCheckerSelectedMonth.year,
    })

    Keyboard.dismiss()

    this.props.uiStore
      .checkFrame(this.parseCurrency(this.state.estimatedPrice))
      .then(result => {
        if (result !== undefined) {
          this.setState({ priceCheckResultVisible: !this.state.priceCheckResultVisible, probability: result * 100 })
        }
      })
      .catch(error => {
        if (error.status === 404) {
          this.setState({ frameMissingErrorVisible: true })
        }
      })
  }

  showFrame = () => {
    this.props.analyticsService.record('PriceCheckScreen.showFrame')
    this.setState({ priceCheckResultVisible: false })
    this.props.navigation.navigate(PriceCheckScreenNames.CroptomizeFrame)
  }

  estimate(): boolean {
    if (this.state.estimatedPrice && this.state.estimatedPrice !== '$0.00') {
      return true
    } else {
      return false
    }
  }

  formatCurrency(pennies: number): string {
    return '$' + (pennies / 100).toFixed(2)
  }

  parseCurrency(moneyStr: string): number | undefined {
    const noDollars = moneyStr.replace(/^\$/g, '')
    const floatDollars = parseFloat(noDollars)
    if (floatDollars < 0 || floatDollars !== floatDollars || noDollars === '') {
      // disallow negative or NaN currency
      return undefined
    }
    const floatCents = floatDollars * 100
    const intCents = Math.floor(floatCents)

    return intCents
  }

  renderDateButton(dateOption: FrameDateOption) {
    return (
      <TouchableOpacity
        onPress={() => this.changeMonth(dateOption)}
        style={[styles.dateButton, { backgroundColor: dateOption.isSelected ? AppColors.yellow : 'white' }]}
      >
        <View>
          <View>
            <Text style={[styles.buttonTitle, styles.navyText]}>
              {dateOption.month} {dateOption.year}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const CheckPriceButton = styled(AppButton)`
  align-self: stretch;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 20px;
  margin-top: 15px;
`

const BSCheckerText = styled.Text`
  font-size: 14px;
  font-family: ${AppFonts.semiBold};
  color: ${AppColors.navy};
  margin-left: 20px;
  margin-top: 15px;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    color: AppColors.white,
    flex: 0,
  },
  logoMark: {
    marginTop: 48,
    alignSelf: 'center',
    height: 63,
    width: 85,
  },
  button1Style: {
    backgroundColor: '#1A3E61',
    height: 32,
    borderRadius: 5,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  button2Style: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  title1Style: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  title2Style: {
    fontFamily: 'Montserrat-Medium',
    color: '#1A3E61',
    textAlign: 'center',
    fontSize: 15,
  },
  priceCheckerLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#1A3E61',
    marginTop: 9,
    marginBottom: 9,
    alignSelf: 'center',
    textAlign: 'center',
  },
  monthPicker: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginTop: 13,
  },
  createAccountTitle: {
    color: '#1A3E61',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    marginTop: 16,
  },
  createAccountTexts: {
    color: AppColors.white,
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginRight: 10,
    marginTop: 20,
  },
  signInText: {
    color: AppColors.white,
    alignSelf: 'flex-start',
    fontSize: 18,
    marginLeft: 20,
  },
  inlineError: {
    color: AppColors.errorMessage,
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  createAccountContainerButtonStyle: {
    backgroundColor: AppColors.appPurple,
    alignSelf: 'stretch',
  },
  createAccountButtonStyle: {
    backgroundColor: AppColors.appPurple,
    height: 50,
  },
  createAccountButtonTextStyle: {
    fontSize: 18,
  },
  formInputContainer: {
    backgroundColor: '#F2F2E6',
    borderColor: '#86D0CA',
    height: 48,
    borderRadius: 15,
    marginLeft: 24,
    marginTop: 4,
    marginRight: 24,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
  },
  textInputStyle: {
    fontSize: 28,
    padding: 9,
    flex: 1,
    color: '#8C9EAF',
    marginLeft: 15,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  textInputSideIcon: {
    marginRight: 20,
    tintColor: AppColors.appPurple,
  },
  boldMini: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#1A3E61',
  },
  mini: {
    color: '#1A3E61',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
  },
  dateButton: {
    borderRadius: 5,
    padding: 16,
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonTitle: {
    paddingTop: 0,
  },
  navyText: {
    fontSize: 15,
    color: AppColors.navy,
    fontFamily: AppFonts.semiBold,
  },
  frameMissingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameMissingButton: {
    height: 54,
    backgroundColor: '#FFCE51',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  frameMissingTitle: {
    fontSize: 15,
    color: '#1A3E61',
    fontFamily: AppFonts.heading,
    textAlign: 'center',
  },
})
