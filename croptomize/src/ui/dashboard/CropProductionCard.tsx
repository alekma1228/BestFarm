import React from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { CropIcon } from '../components/CropIcon'
import { CropStore } from '../../stores/DashboardStore'
import MaterialI from 'react-native-vector-icons/MaterialIcons'
import { formatToCurrency } from '../../utilities/currency'
import styled from 'styled-components/native'

const SCREEN_HEIGHT = Dimensions.get('window').height

type Props = {
  crop: CropStore
  year: string | number
  onPress: () => void
  // sent so that it re-renders when editing
  minimalYield: number
  maximumYield: number
  numOfAcres: number
  expectedYield: number
}
const CropProductionCard: React.FC<Props> = props => {
  const { crop, year, onPress, minimalYield, maximumYield, numOfAcres, expectedYield } = props

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <View style={cardStyle}>
        <View style={titleStyle.container}>
          <View style={titleStyle.view}>
            <CropIcon backgroundColor={crop.color} picture={crop.picture} style={titleStyle.icon} />
            <Text style={titleStyle.titleText}>{crop.displayName}</Text>
            <Text style={titleStyle.editText}>Edit</Text>
            <MaterialI name="edit" size={14} color={AppColors.appGreen} />
          </View>
          <Text style={titleStyle.subText}>{year} Production Estimates</Text>
        </View>
        <View style={bottomViewStyle}>
          <Text style={hTextStyle}>Crop Yields & Cost of Production</Text>
          <View style={otherStyle.rowSpace}>
            <BottomCard title="Minimum" value={minimalYield} cost={crop.totalExpenses / (minimalYield * numOfAcres)} />
            <View style={otherStyle.empty} />
            <BottomCard title="Expected" value={expectedYield} cost={crop.totalExpenses / (expectedYield * numOfAcres)}>
              <BlueBorder />
            </BottomCard>
            <View style={otherStyle.empty} />
            <BottomCard title="Maximum" value={maximumYield} cost={crop.totalExpenses / (maximumYield * numOfAcres)} />
          </View>
          <View style={[darkContainerStyle, { padding: 10, marginTop: 10 }]}>
            <Text style={otherStyle.blueText}>Acres</Text>
            <View style={otherStyle.row}>
              <Text style={otherStyle.acreText}>{numOfAcres} ac</Text>
              <Text style={otherStyle.bigBlueText}>${formatToCurrency(crop.totalExpensesCost / numOfAcres)}</Text>
              <Text style={otherStyle.unitText}> ac</Text>
            </View>
            <RowWithLine>
              <Text style={[otherStyle.blueText, { flex: 1 }]}>Expected Production</Text>
              <Text style={otherStyle.bigBlueText}>${formatToCurrency(crop.expectedYield * crop.numOfAcres, 0)}</Text>
              <Text style={otherStyle.unitText}> bu</Text>
            </RowWithLine>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

type BCardProps = { title: string; value: number; cost: number }
const BottomCard: React.FC<BCardProps> = ({ title, value, cost, children }) => (
  <View style={[darkContainerStyle, { flex: 1 }]}>
    {children}
    <Text style={[otherStyle.blueText, otherStyle.margin, { marginTop: 15 }]}>{title}</Text>
    <Text style={[otherStyle.acreText, otherStyle.margin, { marginTop: 5, fontSize: 14 }]}>{value} bu/ac</Text>
    <View style={otherStyle.lineContainer}>
      <View style={otherStyle.line} />
    </View>
    <View style={[otherStyle.row, { padding: 10 }]}>
      <Text style={[otherStyle.bigBlueText]}>${formatToCurrency(cost)}</Text>
      <Text style={[otherStyle.unitText]}>/bu</Text>
    </View>
  </View>
)

const BlueBorder = styled.View`
  position: absolute;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${AppColors.appTealLightest};
  top: -5px;
  left: -5px;
  bottom: -5px;
  right: -5px;
`
const RowWithLine = styled.View`
  border-top-width: 1px;
  border-color: ${AppColors.navy};
  flex-direction: row;
  padding-top: 10px;
  margin-top: 10px;
`
const { containerStyle, darkContainerStyle, bottomViewStyle, hTextStyle, cardStyle } = StyleSheet.create({
  containerStyle: {
    marginTop: -SCREEN_HEIGHT * 0.18,
    zIndex: 1,
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardStyle: {
    height: 370,
    borderRadius: 5,
    backgroundColor: AppColors.lightCream,
    shadowColor: AppColors.navy,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  bottomViewStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  darkContainerStyle: {
    position: 'relative',
    backgroundColor: AppColors.darkCream,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.thinLine,
  },
  hTextStyle: {
    fontFamily: AppFonts.bold,
    fontSize: 14,
    color: AppColors.navy,
    marginTop: 15,
    marginBottom: 5,
  },
})

const otherStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  empty: {
    width: 10,
  },
  lineContainer: {
    position: 'absolute',
    width: '100%',
    height: '110%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.navy,
  },
  margin: {
    marginLeft: 10,
    marginRight: 10,
  },
  rowSpace: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blueText: {
    fontFamily: AppFonts.semiBold,
    color: AppColors.navy,
  },
  unitText: {
    fontFamily: AppFonts.bold,
    alignSelf: 'flex-end',
    color: AppColors.navy,
    fontSize: 14,
  },
  bigBlueText: {
    fontFamily: AppFonts.bold,
    fontSize: 18,
    color: AppColors.navy,
  },
  acreText: {
    flex: 1,
    fontSize: 16,
    fontFamily: AppFonts.bold,
    color: AppColors.appGreen,
  },
})

const titleStyle = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: AppColors.thinLine,
  },
  view: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    alignSelf: 'center',
    marginLeft: 10,
    flex: 1,
    fontFamily: AppFonts.bold,
    color: AppColors.navy,
    textTransform: 'uppercase',
    fontSize: 18,
  },
  icon: {
    width: 30,
    height: 30,
  },
  editText: {
    fontFamily: AppFonts.bold,
    alignSelf: 'center',
    color: AppColors.appGreen,
    fontSize: 13,
  },
  subText: {
    fontFamily: AppFonts.semiBold,
    color: AppColors.navy,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
})

export default CropProductionCard
