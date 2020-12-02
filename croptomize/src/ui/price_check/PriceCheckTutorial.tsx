import React from 'react'
import { observer } from 'mobx-react'
import { Modal, StyleSheet, View, ImageBackground, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { AppColors, AppFonts, AppButton, AppButtonText } from '../styles/AppStyles'
import { DropDownButton } from '../components/DropDownButton'
import { PriceCheckTutorialProps } from './PriceCheckTutorialProps'
import styled from 'styled-components/native'
import { TextInput } from 'react-native-gesture-handler'

@observer
export default class PriceCheckTutorial extends React.Component<PriceCheckTutorialProps> {
  constructor(props: PriceCheckTutorialProps) {
    super(props)
  }

  onDropDown() {
    console.log('onDropDown')
  }
  onCheckPrice() {
    console.log('onCheckPrice')
  }
  render() {
    const { pageIndex } = this.props
    let tutorialContents
    if (pageIndex === 1) {
      tutorialContents = this.renderTutorialFirst()
    } else if (pageIndex === 2) {
      tutorialContents = this.renderTutorialSecond()
    } else if (pageIndex === 3) {
      tutorialContents = this.renderTutorialThird()
    } else if (pageIndex === 4) {
      tutorialContents = this.renderTutorialFourth()
    } else {
      return null
    }
    return (
      <Modal transparent={true} visible={true}>
        <View style={styles.tutorialView}>
          <SafeAreaView />
          {tutorialContents}
        </View>
      </Modal>
    )
  }

  renderTutorialFirst() {
    let { dropDownText } = this.props
    if (!dropDownText) {
      dropDownText = ''
    }
    return (
      <View>
        <View style={styles.tutorialFocusView1}>
          <DropDownButton action={() => this.onDropDown()} text={dropDownText} style={styles.monthPicker} />
        </View>
        <View style={styles.tutorialDialogContainer}>
          <View style={styles.arrowUp}></View>
          <View style={styles.tutorialContents}>
            <View style={styles.tutorialTitleView}>
              <Text style={styles.tutorialTitle}>Welcome to Croptomize Intelligence</Text>
              <Text style={styles.tutorialPage}>1/4</Text>
            </View>
            <Text style={styles.tutorialDescription}>
              To check the odds of different crop prices, first select the crop.
            </Text>
            <NextButton onPress={() => this.props.onNext()}>
              <Text style={styles.tutorialButton}>Next</Text>
            </NextButton>
            <TouchableOpacity style={styles.tutorialExitView} onPress={() => this.props.onExit()}>
              <Text style={styles.tutorialButton}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  renderTutorialSecond() {
    return (
      <View>
        <View style={styles.tutorialFocusView2}>
          <View style={styles.formInputContainer}>
            <TextInput value={'$0.00'} editable={false} style={styles.textInputStyle}></TextInput>
          </View>
        </View>
        <View style={styles.tutorialDialogContainer}>
          <View style={styles.arrowUp}></View>
          <View style={styles.tutorialContents}>
            <View style={styles.tutorialTitleView}>
              <Text style={styles.tutorialTitle}>Using Croptomize Intelligence</Text>
              <Text style={styles.tutorialPage}>2/4</Text>
            </View>
            <Text style={styles.tutorialDescription}>
              <Text style={{ fontWeight: 'bold' }}>Tap</Text> in the price box and enter a price using the numeric
              keyboard.
            </Text>
            <NextButton onPress={() => this.props.onNext()}>
              <Text style={styles.tutorialButton}>Next</Text>
            </NextButton>
            <TouchableOpacity style={styles.tutorialExitView} onPress={() => this.props.onExit()}>
              <Text style={styles.tutorialButton}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  renderTutorialThird() {
    const { estimatePrice } = this.props
    return (
      <View>
        <View style={styles.tutorialFocusView2}>
          <View style={styles.formInputContainer}>
            <TextInput
              value={estimatePrice}
              editable={false}
              style={[styles.textInputStyle, { color: AppColors.navy }]}
            ></TextInput>
          </View>
          <CheckPriceButton disabled={false} onPress={() => this.onCheckPrice()}>
            <AppButtonText disabled={false}>Check Price</AppButtonText>
          </CheckPriceButton>
        </View>
        <View style={styles.tutorialDialogContainer}>
          <View style={styles.arrowUp}></View>
          <View style={styles.tutorialContents}>
            <View style={styles.tutorialTitleView}>
              <Text style={styles.tutorialTitle}>Using Croptomize Intelligence</Text>
              <Text style={styles.tutorialPage}>3/4</Text>
            </View>
            <Text style={styles.tutorialDescription}>
              <Text style={{ fontWeight: 'bold' }}>Tap</Text> the{' '}
              <Text style={{ fontWeight: 'bold' }}>Check Price</Text> button to see the likelihood of that price.
            </Text>
            <NextButton onPress={() => this.props.onNext()}>
              <Text style={styles.tutorialButton}>Next</Text>
            </NextButton>
            <TouchableOpacity style={styles.tutorialExitView} onPress={() => this.props.onExit()}>
              <Text style={styles.tutorialButton}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  renderTutorialFourth() {
    const { probabilityWord, probabilityText } = this.props
    let { probabilityIcon } = this.props
    if (!probabilityIcon) {
      probabilityIcon = 0
    }
    return (
      <View>
        <View style={styles.tutorialFocusView4}>
          <Text style={styles.big}>Price Check Results</Text>
          <ImageBackground source={probabilityIcon} style={styles.probabilityImage}>
            <Text style={styles.percent}>{probabilityWord}</Text>
          </ImageBackground>
          <Text style={styles.message}>{probabilityText}</Text>
        </View>
        <View style={styles.tutorialDialogContainer}>
          <View style={styles.tutorialContents}>
            <View style={styles.tutorialTitleView}>
              <Text style={styles.tutorialTitle}>Using Croptomize Intelligence</Text>
              <Text style={styles.tutorialPage}>4/4</Text>
            </View>
            <Text style={styles.tutorialDescription}>Price check results show you the probability of that price.</Text>
            <NextButton onPress={() => this.props.onNext()}>
              <Text style={styles.tutorialButton}>Done</Text>
            </NextButton>
          </View>
        </View>
      </View>
    )
  }
}

const NextButton = styled(AppButton)`
  margin-top: 25px;
`
const CheckPriceButton = styled(AppButton)`
  align-self: stretch;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
`

const styles = StyleSheet.create({
  tutorialView: {
    position: 'absolute',
    backgroundColor: AppColors.tutorialBackground,
    width: '100%',
    height: '100%',
  },
  tutorialFocusView1: {
    marginTop: 85,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    opacity: 1,
  },
  monthPicker: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    height: 50,
  },
  tutorialFocusView2: {
    marginTop: 215,
    marginLeft: 19,
    marginRight: 19,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    opacity: 1,
  },
  tutorialFocusView4: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    opacity: 1,
  },
  big: {
    fontFamily: AppFonts.heading,
    fontSize: 28,
    color: AppColors.navy,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
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
    color: AppColors.navy,
    marginBottom: 40,
  },
  message: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: AppFonts.subheading,
    color: AppColors.navy,
    marginHorizontal: 28,
  },
  formInputContainer: {
    backgroundColor: AppColors.darkCream,
    borderColor: AppColors.info,
    height: 48,
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
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
    color: AppColors.lightGreyText,
    marginLeft: 15,
    fontFamily: AppFonts.medium,
    textAlign: 'center',
  },
  tutorialDialogContainer: {
    marginTop: 20,
  },
  arrowUp: {
    width: 0,
    height: 0,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: AppColors.white,
    borderLeftColor: 'transparent',
  },
  tutorialContents: {
    backgroundColor: AppColors.white,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 15,
    padding: 25,
  },
  tutorialTitleView: {
    flexDirection: 'row',
  },
  tutorialTitle: {
    fontFamily: AppFonts.regular,
    marginRight: 75,
    fontSize: 15,
    color: AppColors.navy,
    fontWeight: 'bold',
  },
  tutorialPage: {
    position: 'absolute',
    fontFamily: AppFonts.regular,
    fontSize: 12,
    color: AppColors.lightGreyText,
    right: 0,
  },
  tutorialDescription: {
    marginTop: 15,
    fontFamily: AppFonts.regular,
    fontSize: 14,
    color: AppColors.navy,
  },
  tutorialExitView: {
    marginTop: 15,
  },
  tutorialButton: {
    alignSelf: 'center',
    fontFamily: AppFonts.button,
    fontSize: 14,
    color: AppColors.navy,
    fontWeight: 'bold',
  },
})
