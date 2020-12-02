import React from 'react'
import { Modal, StyleSheet, View, Image, Text } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { CFOTutorialComponentProps } from './CFOTutorialProps'
import { SafeAreaView } from 'react-navigation'
import { CFOTutorialSliderComponent } from './CFOTutorialSliderComponent'
import { AppColors } from '../styles/AppStyles'
// import { Adjust, AdjustEvent } from 'react-native-adjust'
// import { AppEventsLogger } from 'react-native-fbsdk'

interface CFOTutorialScreenState {
  index: number
  visible: boolean
}

const slides = [
  {
    title: 'How To Use Farm CFO',
    message:
      'The screen provides a snapshot of overall farm profitability, built from crop-level revenue and expense detail added by the user. First enter projected revenue.',
    key: 'cfo_tutorial_slide_1',
    image: require('../../../assets/cfo-tutorial-1_7.png'),
    pageNumber: 1,
  },
  {
    title: 'How To Use Farm CFO',
    message:
      'If you have made any cash sales for the selected crop, enter the number of bushels and average sale price here.',
    key: 'cfo_tutorial_slide_2',
    image: require('../../../assets/cfo-tutorial-2_7.png'),
    pageNumber: 2,
  },
  {
    title: 'How To Use Farm CFO',
    message:
      'Enter a projected basis for unsold bushels. This will be used in combination with futures market data to calculate the value of unsold bushels.',
    key: 'cfo_tutorial_slide_3',
    image: require('../../../assets/cfo-tutorial-3_7.png'),
    pageNumber: 3,
  },
  {
    title: 'How To Use Farm CFO',
    message: 'Enter projected number of acres for the selected crop with yield assumptions.',
    key: 'cfo_tutorial_slide_4',
    image: require('../../../assets/cfo-tutorial-4_7.png'),
    pageNumber: 4,
  },
  {
    title: 'How To Use Farm CFO',
    message: 'Enter projected crop expenses per acre here:',
    key: 'cfo_tutorial_slide_5',
    image: require('../../../assets/cfo-tutorial-5_7.png'),
    pageNumber: 5,
  },
  {
    title: 'How To Use Farm CFO',
    message: 'Select an individual crop to review the information entered.',
    key: 'cfo_tutorial_slide_6',
    image: require('../../../assets/cfo-tutorial-6_7.png'),
    pageNumber: 6,
  },
  {
    title: 'How To Use Farm CFO',
    message:
      'This screen provides farm-level revenue and expense projections combining your crop totals. Projected revenue will fluctuate as the value of unsold bushels changes with updated futures market prices.',
    key: 'cfo_tutorial_slide_7',
    image: require('../../../assets/cfo-tutorial-7_7.png'),
    pageNumber: 7,
  },
]

export default class CFOTutorialScreen extends React.Component<CFOTutorialComponentProps, CFOTutorialScreenState> {
  constructor(props: CFOTutorialComponentProps) {
    super(props)

    this.state = {
      index: 0,
      visible: false,
    }
  }
  componentDidMount() {
    this.props.uiStore.getHasSeenCFOTutorial().then(hasSeen => {
      if (hasSeen) {
        this.setState({ visible: false })
      } else {
        this.setState({ visible: true })
      }
    })
  }

  nextPressed() {
    if (this.state.index <= 3) {
      this.setState({ index: this.state.index + 1 })
    } else if (this.state.index === 4) {
      this.finishPressed()
    }
  }

  finishPressed = () => {
    this.setState({ visible: false })
    this.props.uiStore.setHasSeenCFOTutorial(true)
  }

  render() {
    if (!this.state.visible) {
      return null
    }

    return (
      <Modal transparent={true} visible={true}>
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
                renderDoneButton={() => this.renderButton('FINISH')}
                onDone={() => this.finishPressed()}
                onSkip={() => this.finishPressed()}
                dotStyle={styles.inactiveDotStyle}
                activeDotStyle={styles.activeDotStyle}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
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
      <CFOTutorialSliderComponent
        style={styles.pageStyle}
        title={item.title}
        message={item.message}
        image={item.image}
        pageNumber={item.pageNumber}
      />
    )
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
    marginLeft: 25,
    marginRight: 25,
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
    color: AppColors.navy,
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
