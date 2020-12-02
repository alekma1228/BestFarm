import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { formatToCurrency } from '../../utilities/currency'
import { extractProp } from '../../utilities/recipes'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SIZE = SCREEN_HEIGHT * 0.26

type Props = { expenses: number; revenue: number }
const FarmProfitChart: React.FC<Props> = ({ expenses, revenue }) => {
  const total = revenue - expenses
  const isNeg = total < 0
  const data = [
    { value: expenses, fill: AppColors.lightRed },
    { value: revenue, fill: AppColors.info },
  ].map(({ value, fill }, i) => ({
    value,
    svg: {
      fill,
    },
    arc: {
      outerRadius: i === 0 && isNeg ? '95%' : '90%',
      innerRadius: i === 0 && isNeg ? '65%' : '70%',
    },
    key: fill,
  }))
  return (
    <Container>
      <TextContainer>
        <TopText>Total Profit</TopText>
        <BottomText color={isNeg ? AppColors.lightRed : AppColors.navy}>${formatToCurrency(total, 0)}</BottomText>
      </TextContainer>
      <Chart data={data} />
    </Container>
  )
}

const Container = styled.View`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  z-index: 1;
  top: ${SCREEN_HEIGHT * 0.04};
  align-self: center;
  justify-content: center;
  background-color: ${AppColors.backgroundCream};
  border-radius: ${SIZE / 2}px;
  shadow-color: ${AppColors.navy}
  shadow-radius: 3px;
  shadow-opacity: 0.2;
  shadow-offset: 3px 3px;
`
const TextContainer = styled.View`
  align-self: center;
  position: absolute;
`
const TopText = styled.Text`
  font-family: ${AppFonts.regular};
  font-size: 14px;
  color: ${AppColors.lightNavy};
`
const BottomText = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${extractProp<{ color: string }>('color')};
  text-align: center;
`
const Chart = styled(PieChart)`
  height: ${SIZE}px;
`
export default FarmProfitChart
