import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Dimensions } from 'react-native'
import { TCategory } from '../../stores/DashboardStore'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { formatToCurrency } from '../../utilities/currency'
import styled from 'styled-components/native'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SIZE = SCREEN_HEIGHT * 0.26

type Props = { categories: Array<{ amount: number } & TCategory>; total: number }
export const FarmPieChart: React.FC<Props> = React.memo(({ categories, total }) => {
  const data = categories.map(cat => ({
    value: cat.amount,
    svg: {
      fill: cat.color,
      onPress: () => {},
    },
    key: cat.key,
  }))
  return (
    <Container>
      <TextContainer>
        <TopText>Expenses</TopText>
        <BottomText>${formatToCurrency(total, total === 0 ? 2 : 0)}</BottomText>
      </TextContainer>
      <Chart data={data} />
    </Container>
  )
})

const Container = styled.View`
  width: ${SIZE}px;
  height: ${SIZE}px;
  align-self: center;
  justify-content: center;
  background-color: ${AppColors.backgroundCream};
  border-radius: ${SIZE / 2}px;
  shadow-color: ${AppColors.navy}
  shadow-radius: 3px;
  shadow-opacity: 0.2;
  shadow-offset: 3px 3px;
  margin-top: 20px;
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
  color: ${AppColors.navy};
  text-align: center;
`
const Chart = styled(PieChart)`
  height: ${SIZE}px;
`
