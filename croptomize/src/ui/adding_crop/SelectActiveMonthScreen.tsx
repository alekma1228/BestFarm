import React from 'react'
import moment from 'moment'
import { SelectActiveMonthProps } from './SelectActiveMonthProps'
import { StyleSheet, View, FlatList, Text, TouchableHighlight } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { AppNavigationSectionNames } from '../navigation/AppNavigationSectionNames'
import { observer } from 'mobx-react'
import { GrainBid } from '../../services/MarketDataService'
import { getCropTypeForCropSymbol } from '../../model/Symbols'
import { AppFonts, AppColors, RoundedAppButton, AppButtonText } from '../styles/AppStyles'
import { Icon } from 'react-native-elements'
import styled from 'styled-components/native'

@observer
export class SelectActiveMonthScreen extends React.Component<SelectActiveMonthProps> {
  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#F2F2E6', justifyContent: 'center' }}>
          <Text style={styles.headerText}>Available Active Months</Text>
          {this.props.uiStore.hasBidsForSearch &&
            this.renderBids(this.props.uiStore.bidsByMonthForSearch, this.props.uiStore.selectedGrainBidMonthIndexes)}
          {!this.props.uiStore.hasBidsForSearch && this.renderCBOT(this.props.uiStore.selectedGrainBidMonthIndexes)}
          <View style={{ flex: 1 }} />
          <BottomView>
            <RoundedAppButton
              disabled={!this.props.uiStore.hasSelectedGrainBidMonths}
              onPress={() =>
                this.addSelectedMonthsToDashboard(
                  this.props.uiStore.bidsByMonthForSearch,
                  this.props.uiStore.selectedGrainBidMonthIndexes,
                )
              }
            >
              <AppButtonText disabled={!this.props.uiStore.hasSelectedGrainBidMonths}>
                Add to my Dashboard
              </AppButtonText>
            </RoundedAppButton>
          </BottomView>
        </View>
      </SafeAreaView>
    )
  }

  renderBids(bids: GrainBid[], selectedIndexes: number[]) {
    return (
      <FlatList
        style={{ flexGrow: 0 }}
        data={bids}
        keyExtractor={item => `${item.basisSymbol}_${item.delivery_end}`}
        renderItem={({ index, item }) => (
          <TouchableHighlight onPress={() => this.selectBid(index)}>
            <View style={styles.itemBoxContainer}>
              <View style={styles.itemBox}>
                <Text style={styles.itemText}>{this.displayDateForItem(item)}</Text>
                <View style={styles.deliveryDates}>
                  <Text style={styles.deliveryDateFont}> | </Text>
                  <Text style={[styles.deliveryDateFont, styles.strong]}>Delivery: </Text>
                  <Text style={styles.deliveryDateFont}>
                    {moment(item.delivery_end).format('MM/DD/YYYY')} - {moment(item.delivery_end).format('MM/DD/YYYY')}
                  </Text>
                </View>
              </View>
              {selectedIndexes.includes(index) && <Icon color={AppColors.info} name={'check'} type={'entypo'}></Icon>}
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: 1, width: 20, backgroundColor: '#FCFAF3' }} />
            <View style={styles.seperator} />
          </View>
        )}
        ListHeaderComponent={() => <View style={styles.listBorder} />}
        ListFooterComponent={() => <View style={styles.listBorder} />}
      />
    )
  }

  renderCBOT(selectedIndexes: number[]) {
    if (!this.props.uiStore.selectedCommodity) {
      return
    }

    const cropType = getCropTypeForCropSymbol(this.props.uiStore.selectedCommodity.symbolPrefix)

    return (
      <FlatList
        style={{ flexGrow: 0 }}
        data={this.props.uiStore.getCBOTSelectableDates(cropType)}
        keyExtractor={item => item.displayDate}
        renderItem={({ index, item }) => (
          <TouchableHighlight onPress={() => this.selectCBOTDateEntry(index)}>
            <View style={[styles.itemBox, styles.cbotItemBox]}>
              <Text style={styles.itemText}>{item.displayDate}</Text>
              {selectedIndexes.includes(index) && <Icon color={AppColors.info} name={'check'} type={'entypo'}></Icon>}
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: 1, width: 20, backgroundColor: '#FCFAF3' }} />
            <View style={styles.seperator} />
          </View>
        )}
        ListHeaderComponent={() => <View style={styles.listBorder} />}
        ListFooterComponent={() => <View style={styles.listBorder} />}
      />
    )
  }

  selectBid = (index: number) => {
    if (!this.props.uiStore.selectedGrainBidsResult) {
      return
    }

    this.props.uiStore.toggleGrainBidMonthIndexSelected(index)
  }

  selectCBOTDateEntry = (index: number) => {
    if (!this.props.uiStore.selectedCommodity) {
      return
    }

    this.props.uiStore.toggleGrainBidMonthIndexSelected(index)
  }

  addSelectedMonthsToDashboard = (possibleBids: GrainBid[], selectedIndexes: number[]) => {
    if (this.props.uiStore.hasBidsForSearch) {
      const selectedGrainBidsResult = this.props.uiStore.selectedGrainBidsResult

      if (!selectedGrainBidsResult) {
        return
      }

      const selectedBids = selectedIndexes.map(index => possibleBids[index]).filter(value => value !== undefined)

      for (const bid of selectedBids) {
        this.props.analyticsService.record('SelectActiveMonthScreen.selectBid', {
          commodity: bid.commodity,
          symbol: bid.symbol,
          basismonth: bid.basismonth,
          basisSymbol: bid.basisSymbol,
          cashPriceSymbol: bid.cashPriceSymbol,
          delivery_start: bid.delivery_start,
          delivery_end: bid.delivery_end,
          customer_commodity_id: bid.customer_commodity_id,
          as_of: bid.as_of,
        })

        this.props.basisStore.trackBasisForBid(bid, selectedGrainBidsResult).catch(ex => console.log(ex))
      }
    } else {
      const selectedCommodity = this.props.uiStore.selectedCommodity
      if (!selectedCommodity) {
        return
      }

      const cropType = getCropTypeForCropSymbol(selectedCommodity.symbolPrefix)

      const possibleBasisDateOptions = this.props.uiStore.getCBOTSelectableDates(cropType)
      const basisDateOptions = selectedIndexes
        .map(index => possibleBasisDateOptions[index])
        .filter(value => value !== undefined)

      for (const basisDateOption of basisDateOptions) {
        this.props.analyticsService.record('SelectActiveMonthScreen.selectCBOTDateEntry', {
          displayDate: basisDateOption.displayDate,
          deliveryStartDate: basisDateOption.deliveryStartDate
            ? basisDateOption.deliveryStartDate.toISOString()
            : undefined,
          deliveryEndDate: basisDateOption.deliveryEndDate ? basisDateOption.deliveryEndDate.toISOString() : undefined,
          displayName: selectedCommodity.displayName,
          symbolPrefix: selectedCommodity.symbolPrefix,
        })
        this.props.basisStore.trackBasisForCBOT(basisDateOption, selectedCommodity).catch(ex => console.log(ex))
      }
    }

    this.props.navigation.navigate(AppNavigationSectionNames.MarketInformation)
  }

  displayDateForItem = (item: GrainBid) => {
    return moment(item.delivery_start).format('MMM YYYY')
  }
}

const BottomView = styled.View`
  background-color: ${AppColors.backgroundCream}
  padding: 6px 24px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
`

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#E8E5DC',
    alignSelf: 'flex-end',
    width: 355,
  },
  itemBox: {
    backgroundColor: AppColors.backgroundCream,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  itemBoxContainer: {
    backgroundColor: AppColors.backgroundCream,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  cbotItemBox: {
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#1A3E61',
    marginLeft: 19,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  headerText: {
    color: '#8C9EAF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    marginLeft: 17,
    marginBottom: 7,
    marginTop: 17,
  },
  listBorder: {
    height: 1,
    backgroundColor: '#E8E5DC',
  },
  strong: {
    fontWeight: 'bold',
  },
  deliveryDates: {
    flexDirection: 'row',
  },
  deliveryDateFont: {
    fontFamily: AppFonts.regular,
    color: AppColors.navy,
    fontSize: 11,
  },
})
