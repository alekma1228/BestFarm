import React from 'react'
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, View, FlatList, YellowBox } from 'react-native'
import Orientation from 'react-native-orientation'
import { TradeRegisterProps } from './TradeRegisterProps'
import { AppFonts, AppColors } from '../styles/AppStyles'
import { DropDownButton } from '../components/DropDownButton'
import { SwipeableModal } from '../components/SwipeableModal'
import { RoundedTopView } from '../components/RoundedTopView'
import { CropType, getIdealFarmDisplayNameForCropType } from '../../model/Symbols'

interface TradeRegisterComponentState {
  selectCropVisible: boolean
  historyData: any
  totalData: any
}

export class TradeRegisterScreen extends React.Component<TradeRegisterProps, TradeRegisterComponentState> {
  constructor(props: TradeRegisterProps) {
    super(props)
    const historyData = [
      {
        tradeDate: '5/29/19',
        buySell: 'Sell',
        quantityBushels: '125,000',
        quantityContracts: '25',
        month: 'H20',
        FCP: 'F',
        strikePrice: '-',
        tradePrice: '4.465',
      },
      {
        tradeDate: '5/29/19',
        buySell: 'Buy',
        quantityBushels: '25,000',
        quantityContracts: '5',
        month: 'H20',
        FCP: 'P',
        strikePrice: '4.50',
        tradePrice: '0.3825',
      },
      {
        tradeDate: '6/17/19',
        buySell: 'Sell',
        quantityBushels: '25,000',
        quantityContracts: '5',
        month: 'H20',
        FCP: 'F',
        strikePrice: '-',
        tradePrice: '4.675',
      },
      {
        tradeDate: '6/17/19',
        buySell: 'Sell',
        quantityBushels: '25,000',
        quantityContracts: '5',
        month: 'H20',
        FCP: 'P',
        strikePrice: '4.50',
        tradePrice: '0.28375',
      },
      {
        tradeDate: '7/30/19',
        buySell: 'Sell',
        quantityBushels: '75,000',
        quantityContracts: '15',
        month: 'H20',
        FCP: 'F',
        strikePrice: '-',
        tradePrice: '4,6825',
      },
      {
        tradeDate: '9/6/19',
        buySell: 'Buy',
        quantityBushels: '-',
        quantityContracts: '15',
        month: 'H20',
        FCP: 'F',
        strikePrice: '-',
        tradePrice: '4.31',
      },
      {
        tradeDate: '9/6/19',
        buySell: 'Sell',
        quantityBushels: '-',
        quantityContracts: '60',
        month: 'N20',
        FCP: 'F',
        strikePrice: '-',
        tradePrice: '3.6875',
      },
      {
        tradeDate: '9/6/19',
        buySell: 'Buy',
        quantityBushels: '-',
        quantityContracts: '20',
        month: 'N20',
        FCP: 'P',
        strikePrice: '-',
        tradePrice: '3.8425',
      },
      {
        tradeDate: '9/13/19',
        buySell: 'Sell',
        quantityBushels: '-',
        quantityContracts: '40',
        month: 'N20',
        FCP: 'F',
        strikePrice: '-',
        tradePrice: '0.21125',
      },
    ]
    const totalData = [
      {
        poistion: 'Futures:',
        longShort: 'Short',
        quantityBushels: '125,000',
        quantityContracts: '25',
        month: 'Z20',
        strikePrice: '-',
      },
      {
        poistion: 'Put Options:',
        longShort: 'Long',
        quantityBushels: '25,000',
        quantityContracts: '5',
        month: 'Z20',
        strikePrice: '3.70',
      },
      {
        poistion: 'Total Hedged:',
        longShort: '',
        quantityBushels: '150,000',
        quantityContracts: '',
        month: '',
        strikePrice: '',
      },
      {
        poistion: 'Total Production:',
        longShort: '',
        quantityBushels: '300,000',
        quantityContracts: '',
        month: '',
        strikePrice: '',
      },
      {
        poistion: '% of Production:',
        longShort: '',
        quantityBushels: '50%',
        quantityContracts: '',
        month: '',
        strikePrice: '',
      },
    ]
    this.state = {
      selectCropVisible: false,
      historyData,
      totalData,
    }
  }
  selectCropType(cropType: string) {
    this.setState({ selectCropVisible: false })
    this.props.uiStore.selectIdealFarmCrop(cropType)
  }
  componentDidMount() {
    Orientation.lockToLandscape()
    Orientation.addOrientationListener(this._orientationDidChange)
  }
  _orientationDidChange = (orientation: string) => {
    if (orientation === 'LANDSCAPE') {
      console.log('LANDSCAPE')
    } else {
      console.log('PORTRAIT')
    }
  }
  componentWillUnmount() {
    Orientation.lockToPortrait()
    Orientation.removeOrientationListener(this._orientationDidChange)
  }

  renderCropButton(cropType: string) {
    return (
      <TouchableOpacity
        onPress={() => this.selectCropType(cropType)}
        style={[
          styles.dateButton,
          { backgroundColor: this.props.uiStore.idealFarmCropType === cropType ? AppColors.yellow : 'white' },
        ]}
      >
        <View>
          <View>
            <Text style={[styles.buttonTitle, styles.navyText]}>{getIdealFarmDisplayNameForCropType(cropType)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderHistoryTableRow(item: any, historyData: any) {
    return (
      <View
        style={[
          styles.historyRowView,
          item.item.buySell === 'Sell'
            ? { backgroundColor: AppColors.disabledYellow }
            : { backgroundColor: AppColors.blue },
          item.index === historyData.length - 1 && {
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          },
        ]}
      >
        <Text style={[styles.historyCellTradeDate, styles.historyCellRegularText]}>{item.item.tradeDate}</Text>
        <View style={styles.historyLineVerticalView}></View>
        <Text style={[styles.historyCellBuySell, styles.historyCellRegularText]}>{item.item.buySell}</Text>
        <View style={styles.historyLineVerticalView}></View>
        <Text style={[styles.historyCellQuantityBushels, styles.historyCellRegularText]}>
          {item.item.quantityBushels}
        </Text>
        <View style={styles.historyLineVerticalView}></View>
        <Text style={[styles.historyCellQuantityContacts, styles.historyCellRegularText]}>
          {item.item.quantityContracts}
        </Text>
        <View style={styles.historyLineVerticalView}></View>
        <Text style={[styles.historyCellMonth, styles.historyCellRegularText]}>{item.item.month}</Text>
        <View style={styles.historyLineVerticalView}></View>
        <Text style={[styles.historyCellFCP, styles.historyCellBoldText]}>{item.item.FCP}</Text>
        <View style={styles.historyLineVerticalView}></View>
        <Text style={[styles.historyCellStrikePrice, styles.historyCellRegularText]}>{item.item.strikePrice}</Text>
        <View style={styles.historyLineVerticalView}></View>
        <Text style={[styles.historyCellTradePrice, styles.historyCellRegularText]}>{item.item.tradePrice}</Text>
      </View>
    )
  }

  rendeTotalTable(item: any) {
    return (
      <View style={[styles.totalRowView]}>
        <View
          style={[
            styles.totalCellPosition,
            styles.totalCell,
            item.index % 2 === 0
              ? {
                  backgroundColor: AppColors.lightCream,
                }
              : {
                  backgroundColor: AppColors.greyCream,
                },
          ]}
        >
          <Text style={styles.totalCellBoldText}>{item.item.poistion}</Text>
        </View>
        <View
          style={[
            styles.totalCellLongShort,
            styles.totalCell,
            item.index % 2 === 0
              ? {
                  backgroundColor: AppColors.lightCream,
                }
              : {
                  backgroundColor: AppColors.greyCream,
                },
          ]}
        >
          <Text style={styles.historyCellRegularText}>{item.item.longShort}</Text>
        </View>

        <View
          style={[
            styles.totalCellQuantityBushels,
            styles.totalCell,
            item.index % 2 === 0
              ? {
                  backgroundColor: AppColors.lightCream,
                }
              : {
                  backgroundColor: AppColors.greyCream,
                },
          ]}
        >
          <Text style={styles.historyCellRegularText}>{item.item.quantityBushels}</Text>
        </View>

        {item.item.quantityContracts !== '' ? (
          <View
            style={[
              styles.totalCellQuantityContracts,
              styles.totalCell,
              item.index % 2 === 0
                ? {
                    backgroundColor: AppColors.lightCream,
                  }
                : {
                    backgroundColor: AppColors.greyCream,
                  },
            ]}
          >
            <Text style={styles.historyCellRegularText}>{item.item.quantityContracts}</Text>
          </View>
        ) : (
          <View style={[styles.totalCellQuantityContracts, styles.totalEmptyCell]}></View>
        )}
        {item.item.month !== '' ? (
          <View
            style={[
              styles.totalCellMonth,
              styles.totalCell,
              item.index % 2 === 0
                ? {
                    backgroundColor: AppColors.lightCream,
                  }
                : {
                    backgroundColor: AppColors.greyCream,
                  },
            ]}
          >
            <Text style={styles.historyCellRegularText}>{item.item.month}</Text>
          </View>
        ) : (
          <View style={[styles.totalCellMonth, styles.totalEmptyCell]}></View>
        )}
        {item.item.strikePrice !== '' ? (
          <View
            style={[
              styles.totalCellStrikePrice,
              styles.totalCell,
              item.index % 2 === 0
                ? {
                    backgroundColor: AppColors.lightCream,
                  }
                : {
                    backgroundColor: AppColors.greyCream,
                  },
            ]}
          >
            <Text style={styles.historyCellRegularText}>{item.item.strikePrice}</Text>
          </View>
        ) : (
          <View style={[styles.totalCellStrikePrice, styles.totalEmptyCell]}></View>
        )}
      </View>
    )
  }

  render() {
    const dropDownText = getIdealFarmDisplayNameForCropType(this.props.uiStore.idealFarmCropType)

    return (
      <SafeAreaView style={styles.container}>
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
        <ScrollView>
          <DropDownButton
            action={() => this.setState({ selectCropVisible: true })}
            text={dropDownText}
            style={styles.monthPicker}
          />
          <View style={styles.historyHeaderView}>
            <Text style={[styles.historyCellTradeDate, styles.historyHeaderText]}>Trade{'\n'}Date</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.historyCellBuySell, styles.historyHeaderText]}>Buy/Sell</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.historyCellQuantityBushels, styles.historyHeaderText]}>Quantity{'\n'}Bushels</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.historyCellQuantityContacts, styles.historyHeaderText]}>Quantity{'\n'}Contracts</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.historyCellMonth, styles.historyHeaderText]}>Month</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.historyCellFCP, styles.historyHeaderText]}>F/C/P</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.historyCellStrikePrice, styles.historyHeaderText]}>Strike{'\n'}Price</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.historyCellTradePrice, styles.historyHeaderText]}>Trade{'\n'}Price</Text>
          </View>
          <FlatList
            data={this.state.historyData}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={item => this.renderHistoryTableRow(item, this.state.historyData)}
            style={styles.historyTable}
          />
          <View style={styles.historyHeaderView}>
            <Text style={[styles.totalCellPosition, styles.historyHeaderText]}>Position</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.totalCellLongShort, styles.historyHeaderText]}>Long/Short</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.totalCellQuantityBushels, styles.historyHeaderText]}>Quantity{'\n'}Bushels</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.totalCellQuantityContracts, styles.historyHeaderText]}>Quantity{'\n'}Contracts</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.totalCellMonth, styles.historyHeaderText]}>Month</Text>
            <View style={styles.historyLineVerticalView}></View>
            <Text style={[styles.totalCellStrikePrice, styles.historyHeaderText]}>Strike{'\n'}Price</Text>
          </View>
          <FlatList
            data={this.state.totalData}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={this.rendeTotalTable}
            style={styles.historyTable}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: AppColors.backgroundCream,
  },
  monthPicker: {
    marginLeft: 80,
    marginRight: 80,
    height: 50,
    marginTop: 13,
  },
  dateButton: {
    borderRadius: 5,
    padding: 16,
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  navyText: {
    fontSize: 15,
    color: AppColors.navy,
    fontFamily: AppFonts.semiBold,
  },
  buttonTitle: {
    paddingTop: 0,
  },
  historyTable: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  historyHeaderView: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    height: 38,
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: AppColors.lightGreyText,
    backgroundColor: AppColors.navy,
  },
  historyRowView: {
    alignItems: 'center',
    height: 27,
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: AppColors.lightGreyText,
  },
  historyCellTradeDate: {
    flex: 1.5,
  },
  historyCellBuySell: {
    flex: 1.3,
  },
  historyCellQuantityBushels: {
    flex: 1.6,
  },
  historyCellQuantityContacts: {
    flex: 1.6,
  },
  historyCellMonth: {
    flex: 1.2,
  },
  historyCellFCP: {
    flex: 1,
  },
  historyCellStrikePrice: {
    flex: 1.1,
  },
  historyCellTradePrice: {
    flex: 1.5,
  },
  historyCellRegularText: {
    fontSize: 11,
    fontFamily: AppFonts.regular,
    color: AppColors.navy,
    textAlign: 'center',
  },
  historyCellBoldText: {
    fontSize: 10,
    fontFamily: AppFonts.semiBold,
    color: AppColors.navy,
    textAlign: 'center',
  },
  historyHeaderText: {
    fontSize: 11,
    fontFamily: AppFonts.semiBold,
    color: AppColors.white,
    textAlign: 'center',
  },
  historyLineVerticalView: {
    height: '100%',
    width: 0.5,
    backgroundColor: AppColors.lightGreyText,
  },

  totalRowView: {
    alignItems: 'center',
    height: 27,
    flexDirection: 'row',
    flex: 1,
    borderLeftWidth: 0.5,
    borderColor: AppColors.lightGreyText,
  },
  totalCell: {
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: AppColors.lightGreyText,
    height: '100%',
  },
  totalEmptyCell: {
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: AppColors.backgroundCream,
    height: '100%',
  },
  totalCellPosition: {
    flex: 2.6,
  },
  totalCellLongShort: {
    flex: 1.6,
  },
  totalCellQuantityBushels: {
    flex: 1.4,
  },
  totalCellQuantityContracts: {
    flex: 1.4,
  },
  totalCellMonth: {
    flex: 1,
  },
  totalCellStrikePrice: {
    flex: 1,
  },
  totalCellBoldText: {
    fontSize: 11,
    fontFamily: AppFonts.semiBold,
    color: AppColors.navy,
    textAlign: 'center',
  },
})
