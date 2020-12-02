import React, { useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { formatToCurrency } from '../../utilities/currency'
import { CategoryEnum } from '../../stores/DashboardStore'

type Props = {
  title: string
  catKey?: CategoryEnum
  amount: number
  color: string
  onPress?: (title: string, key: CategoryEnum) => void
  flex?: 1
}
const CategoryCard: React.FC<Props> = props => {
  const { title, amount, color, catKey = null, onPress = () => {}, flex } = props
  const { cardStyle, innerStyle, titleStyle, amountStyle } = styles
  const currency = formatToCurrency(amount, 0)
  const _onPress = useCallback(() => {
    if (catKey) {
      onPress(title, catKey)
    }
  }, [])

  return (
    <TouchableOpacity
      onPress={_onPress}
      style={{ ...cardStyle, borderColor: color, flex, width: flex ? undefined : '49%' }}
    >
      <View style={innerStyle}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={amountStyle}>${currency}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 5,
    borderLeftWidth: 10,
    backgroundColor: AppColors.backgroundCream,
    height: 70,
    marginTop: 5,
    shadowColor: AppColors.navy,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  innerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
  },
  titleStyle: {
    color: AppColors.lightNavy,
    fontFamily: AppFonts.semiBold,
    marginBottom: 4,
  },
  amountStyle: {
    color: AppColors.navy,
    fontFamily: AppFonts.bold,
    fontSize: 15,
  },
})

export default React.memo(CategoryCard)
