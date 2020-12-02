import React from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import { Modal, StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { AppColors, AppFonts, AppButton } from '../styles/AppStyles'
import { Icon } from 'react-native-elements'
import { CropIcon } from '../components/CropIcon'
import styled from 'styled-components/native'
import { MarketFeedTutorialProps } from './MarketFeedTutorialProps'

@observer
export default class MarketFeedTutorial extends React.Component<MarketFeedTutorialProps> {
  constructor(props: MarketFeedTutorialProps) {
    super(props)
  }
  render() {
    const { basis, pageIndex } = this.props
    let description
    if (pageIndex === 1) {
      description = <Text style={styles.tutorialDescription}>Swipe left on the crop location row.</Text>
    } else if (pageIndex === 2) {
      description = (
        <Text style={styles.tutorialDescription}>
          <Text style={{ fontWeight: 'bold' }}>Tap</Text> the button to{' '}
          <Text style={{ fontWeight: 'bold' }}>delete</Text> the crop location.
        </Text>
      )
    } else if (pageIndex === 3) {
      description = (
        <Text style={styles.tutorialDescription}>The crop location will then be removed from your dashboard.</Text>
      )
    } else {
      return null
    }

    return (
      <Modal transparent={true} visible={true}>
        <View style={styles.tutorialView}>
          <SafeAreaView />
          {pageIndex < 3 ? (
            <View style={styles.tutorialFocusView}>
              <CropIcon backgroundColor={basis.displayColor()} picture={basis.picture()} />
              <View style={styles.cropNameContainer}>
                <Text style={styles.cropName}>{basis.displayName}</Text>
                {!basis.isCBOT && basis.deliveryEnd && (
                  <Text style={styles.cropId}>{`Delivery: ${moment(basis.deliveryEnd).format("MMM 'YY")}`}</Text>
                )}
              </View>
              <View style={styles.symbolContainer}>
                <Text style={styles.cropName}>{basis.basisDisplayDate()}</Text>
                <Text style={styles.cropId}>{basis.cbotSymbol}</Text>
              </View>
              <View style={styles.cropPriceContainer}>
                <View>
                  <Text style={[styles.cropName, { textAlign: 'right', marginRight: 22 }]}>
                    {basis.formattedPrice}
                    <Text style={styles.bushelText}>/bu</Text>
                  </Text>
                  {basis.currentBasisInCents && (
                    <Text
                      style={[
                        styles.cropId,
                        {
                          textAlign: 'right',
                          marginRight: 22,
                          color: basis.currentBasisInCents && basis.currentBasisInCents > 0 ? 'green' : 'red',
                        },
                      ]}
                    >
                      ({(basis.currentBasisInCents / 100).toFixed(2)})
                    </Text>
                  )}
                </View>
                <Icon color={'#0000004d'} name={'chevron-right'} type={'entypo'} size={15}></Icon>
              </View>
              {pageIndex === 2 && (
                <View style={styles.tutorialDeleteButton}>
                  <Text style={styles.tutorialDeleteView}>Delete</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.tutorialFocusEmptyView} />
          )}
          <View style={styles.tutorialDialogContainer}>
            {pageIndex < 3 && <View style={styles.arrowUp}></View>}
            <View style={styles.tutorialContents}>
              <View style={styles.tutorialTitleView}>
                <Text style={styles.tutorialTitle}>Deleting a Crop</Text>
                <Text style={styles.tutorialPage}>{pageIndex}/3</Text>
              </View>
              {description}
              <NextButton onPress={() => this.props.onNext()}>
                {pageIndex < 3 && <Text style={styles.tutorialButton}>Next</Text>}
                {pageIndex === 3 && <Text style={styles.tutorialButton}>DONE</Text>}
              </NextButton>
              {pageIndex < 3 && (
                <TouchableOpacity style={styles.tutorialExitView} onPress={() => this.props.onExit()}>
                  <Text style={styles.tutorialButton}>Exit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const NextButton = styled(AppButton)`
  margin-top: 25px;
`

const styles = StyleSheet.create({
  tutorialView: {
    position: 'absolute',
    backgroundColor: AppColors.tutorialBackground,
    width: '100%',
    height: '100%',
  },
  tutorialFocusView: {
    marginTop: 148,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    opacity: 1,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 23,
  },
  tutorialFocusEmptyView: {
    marginTop: 148,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 23,
  },
  tutorialDeleteButton: {
    right: 0,
    position: 'absolute',
    backgroundColor: AppColors.deleteButton,
    height: '100%',
    padding: 18,
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
  },
  tutorialDeleteView: {
    fontSize: 14,
    color: AppColors.lightTextColor,
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

  cropNameContainer: {
    marginLeft: 8,
    width: '33.3%',
    justifyContent: 'center',
  },
  symbolContainer: {
    marginLeft: 8,
    width: '33.3%',
    justifyContent: 'space-between',
  },
  cropPriceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 32,
    width: '33.3%',
    justifyContent: 'space-between',
  },
  cropId: { fontSize: 11, fontFamily: AppFonts.regular, color: AppColors.navy },
  cropName: { fontSize: 15, fontFamily: AppFonts.medium, color: AppColors.navy, marginBottom: 5 },
  bushelText: { fontSize: 11 },
})
