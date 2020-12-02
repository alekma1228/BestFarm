//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import React from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import { StyleSheet, View, Text, TouchableOpacity, SectionList, SafeAreaView, Linking } from 'react-native'
import { MarketFeedProps } from './MarketFeedProps'
import { AppColors, AppFonts, AppButton } from '../styles/AppStyles'
import Collapsible from 'react-native-collapsible'
import { Icon } from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import { MarketInformationScreenNames } from '../navigation/MarketInformationScreenNames'
import { AppNavigationSectionNames } from '../navigation/AppNavigationSectionNames'
import { Basis } from '../../model/Basis'
import { BasisLocation } from '../../model/BasisLocation'
import { LocalizedPricingScreen } from '../pay_wall/LocalizedPricingScreen'
import { PayWallScreenNames } from '../navigation/PayWallNavigation'
import { CropIcon } from '../components/CropIcon'
import { calculatedHeaderHeight } from '../../utilities/safe_area'
import { AdjustEvent, Adjust } from 'react-native-adjust'
import { AppEventsLogger } from 'react-native-fbsdk'
import MarketFeedTutorial from './MarketFeedTutorial'
import styled from 'styled-components/native'

interface MarketFeedComponentState {
  collapsedIds: string[]
  multipleSelect: boolean
  showLocalizedPricingModal: boolean
  tutorialPageIndex: number
}

interface SectionListData {
  name: string
  data: any[]
}

const initialState = {
  collapsedIds: [],
  multipleSelect: false,
  showLocalizedPricingModal: false,
  tutorialPageIndex: 4,
}

@observer
export class MarketFeedScreen extends React.Component<MarketFeedProps, MarketFeedComponentState> {
  constructor(props: MarketFeedProps) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    Adjust.trackEvent(new AdjustEvent('kv4v6c'))
    AppEventsLogger.logEvent('ViewMarketFeed')
    this.setState({ tutorialPageIndex: this.props.uiStore.marketFeedTutorialIndex })
  }

  mapBasisesToSections = (basisLocations: BasisLocation[]) => {
    const data = [] as SectionListData[]
    basisLocations.forEach(location => {
      if (location.trackedBasises.length > 0) {
        const section = {
          name: location.displayName,
          data: location.trackedBasises.slice(),
        } as SectionListData
        data.push(section)
      }
    })

    return data.sort((section1, section2) => section1.name.localeCompare(section2.name))
  }

  setSections = (sectionId: string) => {
    if (this.state.collapsedIds.includes(sectionId)) {
      const newIds = this.state.collapsedIds
      newIds.splice(newIds.indexOf(sectionId), 1)
      this.setState({
        collapsedIds: newIds,
      })
      return
    }

    const newIds = this.state.collapsedIds
    newIds.push(sectionId)
    this.setState({
      collapsedIds: newIds,
    })
    return
  }

  swipeoutButtons = (basis: Basis) => {
    if (this.props.uiStore.isFreeUser) {
      return []
    }

    return [
      {
        text: 'Delete',
        backgroundColor: AppColors.deleteButton,
        onPress: () => this.deleteBasis(basis),
      },
    ]
  }

  deleteBasis(basis: Basis) {
    this.props.analyticsService.record('MarketFeedScreen.deleteBasis', {
      cbotSymbol: basis.cbotSymbol,
      city: basis.location.city,
      state: basis.location.state,
      company: basis.location.company,
      locationId: basis.location.locationId ? `${basis.location.locationId}` : undefined,
    })
    this.props.basisStore.deleteBasis(basis)
  }

  onNextTutorial() {
    const nextTutorialPageIndex = this.props.uiStore.marketFeedTutorialIndex + 1
    this.props.uiStore.setMarketFeedTutorialIndex(nextTutorialPageIndex)
    this.setState({ tutorialPageIndex: nextTutorialPageIndex })
  }
  onExitTutorial() {
    console.log('onExitTutorial')
    this.props.uiStore.setMarketFeedTutorialIndex(4)
    this.setState({ tutorialPageIndex: 4 })
  }
  basisSelected = (basis: Basis) => {
    this.props.analyticsService.record('MarketFeedScreen.basisSelected', {
      cbotSymbol: basis.cbotSymbol,
      city: basis.location.city,
      state: basis.location.state,
      company: basis.location.company,
      locationId: basis.location.locationId ? `${basis.location.locationId}` : undefined,
    })
    this.props.uiStore.selectBasis(basis).catch(ex => console.log(ex))
    this.props.navigation.navigate(MarketInformationScreenNames.MarketDetail, {
      selectedCropSymbol: basis.cropSymbol,
    })
  }

  addCrop = () => {
    if (this.props.uiStore.isFreeUser) {
      this.props.analyticsService.record('MarketFeedScreen.addCrop_isFreeUser')
      this.setState({ showLocalizedPricingModal: true })
      return
    }

    this.props.analyticsService.record('MarketFeedScreen.addCrop_isNotFreeUser')
    this.props.navigation.navigate(AppNavigationSectionNames.AddingCrop)
  }

  renderCrop = (basis: Basis, sectionName: string) => {
    return (
      <View style={styles.lightBackground}>
        <Collapsible collapsed={this.state.collapsedIds.includes(sectionName)}>
          <Swipeout right={this.swipeoutButtons(basis)} style={styles.lightBackground} autoClose={true}>
            <TouchableOpacity style={styles.cropContainer} onPress={() => this.basisSelected(basis)}>
              <View style={[styles.cropDetailsContainer]}>
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
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
          </Swipeout>
        </Collapsible>
      </View>
    )
  }

  render() {
    const sections = this.mapBasisesToSections(this.props.basisStore.basisLocations)
    let basis
    if (sections.length > 0 && sections[0].data.length > 0) {
      basis = sections[0].data[0]
    }
    const tutorialPageIndex = this.props.uiStore.marketFeedTutorialIndex + 1

    return (
      <SafeAreaView style={styles.container}>
        <LocalizedPricingScreen
          onDismiss={() => this.setState({ showLocalizedPricingModal: false })}
          navigation={this.props.navigation}
          visible={this.state.showLocalizedPricingModal}
          onSubscribe={() => this.props.navigation.navigate(PayWallScreenNames.Subscription)}
        />
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>My Basis</Text>
            <Text style={styles.headerSubtext}>updated {this.props.basisStore.updateDateString}</Text>
          </View>
          <AddLocationButton onPress={this.addCrop}>
            <Icon color={AppColors.navy} name={'plus'} type={'entypo'}></Icon>
            <AddLocationText>Location</AddLocationText>
          </AddLocationButton>
        </View>
        <View style={styles.tableContainer}>
          <SectionList
            refreshing={false}
            onRefresh={() => this.props.basisStore.refresh()}
            style={styles.table}
            renderItem={({ item, section }) => this.renderCrop(item, section.name)}
            renderSectionHeader={({ section }) => (
              <TouchableOpacity onPress={() => this.setSections(section.name)}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{section.name}</Text>
                  <Icon
                    color={AppColors.yellow}
                    name={this.state.collapsedIds.includes(section.name) ? ('caretright' as any) : ('caretdown' as any)}
                    type={'antdesign'}
                    size={11}
                  ></Icon>
                </View>
              </TouchableOpacity>
            )}
            sections={this.mapBasisesToSections(this.props.basisStore.basisLocations)}
            keyExtractor={(item, index) => item + index}
          />
          <BarChartText>
            All pricing data is provided by barchart.com. If you'd like to let us know what's missing, {}
            <Text style={{ color: AppColors.appTeal }} onPress={() => this.showEmailForm()}>
              tap here
            </Text>
            .
          </BarChartText>
        </View>

        {basis && tutorialPageIndex <= 3 ? (
          <MarketFeedTutorial
            basis={basis}
            pageIndex={tutorialPageIndex}
            uiStore={this.props.uiStore}
            onNext={() => this.onNextTutorial()}
            onExit={() => this.onExitTutorial()}
          />
        ) : null}
      </SafeAreaView>
    )
  }

  showEmailForm = () => {
    Linking.openURL(
      'mailto:info@croptomize.com?subject=Missing Data&body=Some data is missing from the Market Feed: ',
    ).catch(ex => console.log(ex))
  }
}

const AddLocationText = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: ${AppFonts.button};
  font-weight: bold;
  color: ${AppColors.navy};
`

const AddLocationButton = styled(AppButton)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const BarChartText = styled.Text`
  font-size: 12px;
  font-family: ${AppFonts.body}
  color: ${AppColors.lightNavy}
  text-align: center;
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 10px;
  margin-bottom: 15px;
`

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: AppColors.yellow,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
  },
  cropContainer: {},
  cropDetailsContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.lightCream,
    flexDirection: 'row',
    paddingHorizontal: 23,
    height: 80,
  },
  additionalCropDetailsContainer: {
    justifyContent: 'center',
    backgroundColor: AppColors.lightCream,
    paddingHorizontal: 23,
    fontSize: 11,
    paddingBottom: 12,
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
  deliveryDates: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  container: {
    backgroundColor: AppColors.darkCream,
    flex: 1,
  },
  content: {
    backgroundColor: AppColors.darkCream,
    padding: 20,
  },
  divider: {
    alignSelf: 'flex-end',
    borderBottomWidth: 1,
    borderColor: AppColors.thinLine,
    width: '80%',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 68,
    justifyContent: 'space-between',
    padding: 15,
  },
  lightBackground: {
    backgroundColor: AppColors.lightCream,
  },
  sectionHeader: {
    alignItems: 'center',
    backgroundColor: AppColors.navy,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingRight: 22,
  },
  cropId: { fontSize: 11, fontFamily: AppFonts.regular, color: AppColors.navy },
  cropName: { fontSize: 15, fontFamily: AppFonts.medium, color: AppColors.navy, marginBottom: 5 },
  headerText: { fontSize: 22, fontFamily: AppFonts.semiBold, color: AppColors.navy },
  headerSubtext: { fontSize: 11, fontFamily: AppFonts.medium, color: AppColors.lightGreyText },
  sectionHeaderText: { fontSize: 15, fontFamily: AppFonts.button, color: AppColors.white, textAlign: 'center' },
  cropDetailsText: { fontSize: 14, fontFamily: AppFonts.medium, color: AppColors.navy },
  bushelText: {
    fontSize: 11,
  },
  table: {
    flexGrow: 1,
    backgroundColor: AppColors.darkCream,
  },
  tableContainer: {
    flexGrow: 1,
    marginBottom: calculatedHeaderHeight,
  },
  strong: {
    fontWeight: 'bold',
  },
})
