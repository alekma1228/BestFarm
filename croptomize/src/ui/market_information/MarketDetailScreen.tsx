//
//  MarketDetailScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-08-30
//  Copyright © 2019 Connect the Grey. All Rights Reserved.

import React from 'react'
import moment from 'moment'
import { StyleSheet, SafeAreaView, FlatList, Text, View, TouchableOpacity } from 'react-native'
import { MarketDetailProps } from './MarketDetailProps'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { observer } from 'mobx-react'
import { BasisLocation } from '../../model/BasisLocation'
import { Button } from 'react-native-elements'
import { Graph } from '../components/Graph'
import { LocalizedPricingScreen } from '../pay_wall/LocalizedPricingScreen'
import { SelectActiveMonthPayWallScreen } from '../pay_wall/SelectActiveMonthPayWallScreen'
import { PayWallScreenNames } from '../navigation/PayWallNavigation'
import { SwipeableModal } from '../components/SwipeableModal'
import { HistoricalDateRangeOption } from '../../services/MarketDataService'
import { LoadingView } from '../components/LoadingView'
import { RoundedTopView } from '../components/RoundedTopView'
import { BasisDateOption } from '../../stores/UIStore'
import { AdjustEvent, Adjust } from 'react-native-adjust'
import { DropDownButton } from '../components/DropDownButton'
import { AppEventsLogger } from 'react-native-fbsdk'

interface MarketDetailComponentState {
  localizedPricingModalVisible: boolean
  selectActiveMonthPaywallVisible: boolean
  selectBasisLocationVisible: boolean
  selectBasisDateVisible: boolean
  selectedSection: string
}

@observer
export class MarketDetailScreen extends React.Component<MarketDetailProps, MarketDetailComponentState> {
  constructor(props: MarketDetailProps) {
    super(props)
    this.state = {
      localizedPricingModalVisible: false,
      selectActiveMonthPaywallVisible: false,
      selectBasisLocationVisible: false,
      selectBasisDateVisible: false,
      selectedSection: '1M',
    }
  }

  componentDidMount() {
    Adjust.trackEvent(new AdjustEvent('4w4al4'))
    AppEventsLogger.logEvent('ViewMarketDetails')
  }

  renderBasisButton(location: BasisLocation) {
    return (
      <Button
        onPress={() => this.selectLocation(location)}
        buttonStyle={[
          styles.basisButton,
          { backgroundColor: this.props.uiStore.isSelectedBasisLocation(location) ? AppColors.yellow : 'white' },
        ]}
        title={location.displayName}
        titleStyle={[styles.buttonTitle, styles.navyText]}
      />
    )
  }

  renderDateButton(dateOption: BasisDateOption) {
    return (
      <TouchableOpacity
        onPress={() => this.selectDateOption(dateOption)}
        style={[styles.basisButton, { backgroundColor: dateOption.isSelected ? AppColors.yellow : 'white' }]}
      >
        <View>
          <View>
            <Text style={[styles.buttonTitle, styles.navyText]}>{dateOption.displayDate}</Text>
          </View>
          {dateOption.deliveryStartDate && (
            <View style={styles.deliveryDatesContainer}>
              <Text style={[styles.deliveryDatesFont, styles.strong]}>Delivery Dates:</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.deliveryDatesFont}>
                  <Text style={styles.strong}>Start:</Text> {moment(dateOption.deliveryStartDate).format('MM/DD/YYYY')}
                </Text>
                <Text style={styles.deliveryDatesFont}>
                  <Text style={styles.strong}>End:</Text> {moment(dateOption.deliveryEndDate).format('MM/DD/YYYY')}
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  renderTimeButton(dateRange: keyof typeof HistoricalDateRangeOption, selectedRange: HistoricalDateRangeOption) {
    const isSelected = selectedRange === HistoricalDateRangeOption[dateRange]
    return (
      <Button
        onPress={() => this.showDateRange(dateRange)}
        buttonStyle={[styles.sectionButton, { backgroundColor: isSelected ? AppColors.navy : 'transparent' }]}
        title={HistoricalDateRangeOption[dateRange]}
        titleStyle={[styles.buttonTitle, isSelected ? styles.whiteText : styles.navyText]}
      />
    )
  }

  showDateRange(dateRange: keyof typeof HistoricalDateRangeOption) {
    this.props.analyticsService.record('MarketDetailScreen.showDateRange', {
      dateRange: dateRange,
    })
    this.props.uiStore.showDateRange(HistoricalDateRangeOption[dateRange]).catch((ex: any) => console.log(ex))
  }

  renderDivider() {
    return <View style={{ width: 12 }} />
  }

  showSelectLocation = () => {
    if (this.props.uiStore.isFreeUser) {
      this.props.analyticsService.record('MarketDetailScreen.showSelectLocation_isFreeUser')
      this.setState({ localizedPricingModalVisible: true })
      return
    }

    this.props.analyticsService.record('MarketDetailScreen.showSelectLocation_isNotFreeUser')
    this.setState({ selectBasisLocationVisible: true })
  }

  selectLocation = (location: BasisLocation) => {
    this.props.analyticsService.record('MarketDetailScreen.selectLocation', {
      city: location.city,
      state: location.state,
      company: location.company,
      locationId: location.locationId ? `${location.locationId}` : undefined,
    })
    this.setState({ selectBasisLocationVisible: false })
    this.props.uiStore.selectBasisLocation(location)
  }

  selectDateOption = (dateOption: BasisDateOption) => {
    this.props.analyticsService.record('MarketDetailScreen.selectDateOption', {
      displayDate: dateOption.displayDate,
      deliveryStartDate: dateOption.deliveryStartDate ? dateOption.deliveryStartDate.toISOString() : undefined,
      deliveryEndDate: dateOption.deliveryEndDate ? dateOption.deliveryEndDate.toISOString() : undefined,
      lastSeenPrice: dateOption.lastSeenPrice ? dateOption.lastSeenPrice : undefined,
      isSelected: dateOption.isSelected ? '1' : '0',
    })
    this.setState({ selectBasisDateVisible: false })
    this.props.uiStore.selectDateOption(dateOption)
  }

  showSelectDate = () => {
    if (this.props.uiStore.isFreeUser) {
      this.props.analyticsService.record('MarketDetailScreen.showSelectDate_isFreeUser')
      this.setState({ selectActiveMonthPaywallVisible: true })
    }

    this.props.analyticsService.record('MarketDetailScreen.showSelectDate_isNotFreeUser')
    this.setState({ selectBasisDateVisible: true })
  }

  formatPriceChange = (percentage: number) => {
    if (percentage === 0) {
      return `No change ${this.props.uiStore.displayDateRange}`
    }

    const upOrDown = percentage > 0 ? 'Up' : 'Down'
    return `${upOrDown} ${percentage.toFixed(1)}% ${this.props.uiStore.displayDateRange}`
  }

  render() {
    const selectedBasis = this.props.uiStore.selectedBasis
    const selectedRange = this.props.uiStore.graphSelectedDateRange

    const dateSelectionTitle =
      selectedBasis && selectedBasis.isCBOT ? 'Select Basis Date' : 'Select Cash Bid Delivery Date'

    return (
      <SafeAreaView style={styles.container}>
        <LocalizedPricingScreen
          onDismiss={() => this.setState({ localizedPricingModalVisible: false })}
          navigation={this.props.navigation}
          visible={this.state.localizedPricingModalVisible}
          onSubscribe={() => this.props.navigation.navigate(PayWallScreenNames.Subscription)}
        />
        <SwipeableModal
          onDismiss={() => this.setState({ selectActiveMonthPaywallVisible: false })}
          visible={this.state.selectActiveMonthPaywallVisible}
        >
          <SelectActiveMonthPayWallScreen
            onSubscribe={() => this.props.navigation.navigate(PayWallScreenNames.Subscription)}
          />
        </SwipeableModal>
        <SwipeableModal
          onDismiss={() => this.setState({ selectBasisLocationVisible: false })}
          visible={this.state.selectBasisLocationVisible}
        >
          <RoundedTopView title={'Select Basis Location'}>
            <FlatList
              data={this.props.uiStore.locationsMatchingSelectedBasis}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => this.renderBasisButton(item)}
            />
          </RoundedTopView>
        </SwipeableModal>
        <SwipeableModal
          onDismiss={() => this.setState({ selectBasisDateVisible: false })}
          visible={this.state.selectBasisDateVisible}
        >
          <RoundedTopView title={dateSelectionTitle}>
            <FlatList
              data={this.props.uiStore.selectableDates}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => this.renderDateButton(item)}
            />
          </RoundedTopView>
        </SwipeableModal>
        <View style={styles.headerContainer}>
          {selectedBasis && (
            <DropDownButton
              action={() => this.showSelectLocation()}
              text={selectedBasis.location.displayName}
              iconName={'map-marker'}
            />
          )}
          {selectedBasis && (
            <DropDownButton
              action={() => this.showSelectDate()}
              text={selectedBasis.displayDate()}
              iconName={'calendar'}
            />
          )}
        </View>
        {selectedBasis && (
          <View style={styles.bottomView}>
            <View style={styles.mainContainer}>
              <Text style={styles.updateText}>updated {selectedBasis.lastUpdatedString}</Text>
              <Text style={styles.priceFont}>
                {selectedBasis.formattedPrice}
                <Text style={[styles.priceFont, { fontSize: 16 }]}>/bu</Text>
              </Text>
              <Text
                style={[styles.priceChange, { color: selectedBasis.priceChangePercentage < 0 ? '#F16464' : 'green' }]}
              >
                {selectedBasis.hasHistoricalData && this.formatPriceChange(selectedBasis.priceChangePercentage)}
              </Text>
            </View>
            <View style={styles.graphView}>
              {!this.props.uiStore.graphLoading ? <Graph datapoints={selectedBasis.historicalData} /> : <LoadingView />}
            </View>
            <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center' }}>
              <FlatList
                data={this.props.uiStore.historicalDateRangeOptions}
                horizontal
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item }: { item: any }) => this.renderTimeButton(item, selectedRange)}
                ItemSeparatorComponent={() => this.renderDivider()}
                style={{ flexGrow: 0 }}
                scrollEnabled={false}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  deliveryDatesContainer: { marginTop: 10 },
  deliveryDatesFont: { fontSize: 14, color: AppColors.navy, fontFamily: AppFonts.regular },
  basisButton: {
    borderRadius: 5,
    padding: 16,
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  sectionButton: {
    borderRadius: 5,
    paddingHorizontal: 16,
    alignContent: 'center',
    justifyContent: 'center',
    height: 32,
  },
  buttonTitle: {
    paddingTop: 0,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: AppColors.darkCream,
  },
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'stretch',
  },
  mainContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: -4, width: 0 }, // IOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: AppColors.lightCream,
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    backgroundColor: AppColors.lightCream,
  },
  graphView: {
    margin: 15,
    flex: 1,
  },
  container: { flex: 1 },
  whiteText: {
    fontSize: 15,
    color: AppColors.white,
    fontFamily: AppFonts.bold,
  },
  navyText: {
    fontSize: 15,
    color: AppColors.navy,
    fontFamily: AppFonts.semiBold,
  },
  updateText: {
    marginTop: 14,
    fontFamily: AppFonts.medium,
    color: AppColors.lightGreyText,
    fontSize: 11,
  },
  priceFont: {
    fontFamily: AppFonts.semiBold,
    color: AppColors.navy,
    fontSize: 40,
  },
  priceChange: { marginTop: 8, fontFamily: AppFonts.medium, fontSize: 13 },

  strong: {
    fontWeight: 'bold',
  },
})
