import React, { useCallback } from 'react'
import cropInfoStyles from './CropInfoStyles'
import { formatToCurrency } from '../../utilities/currency'
import { CropStore, CATEGORIES } from '../../stores/DashboardStore'
import { AppColors } from '../styles/AppStyles'
import { useNavigation } from 'react-navigation-hooks'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { observer } from 'mobx-react-lite'

type Props = { crop: CropStore }
const CropExpensesCard: React.FC<Props> = observer(({ crop }) => {
  const rootNavigation = (useNavigation() as any).getScreenProps().rootNavigation
  const toExpenses = useCallback(
    () => rootNavigation.navigate(DashboardScreenNames.EditCropExpenses, { key: crop.symbolPrefix }),
    [],
  )
  return (
    <ShadowCardButton onPress={toExpenses}>
      <Item>
        <Row paddingRight={10}>
          <Title>Expenses</Title>
          <Edit>Edit</Edit>
          <EditIcon />
        </Row>
        <SubText>Based on expenses per acre and production estimate number of acres.</SubText>
      </Item>
      {Object.values(CATEGORIES).map(c => (
        <Item key={c.key} leftWidth={10} color={c.color}>
          <Row paddingRight={10}>
            <GreyItemText>{c.title}</GreyItemText>
            <MediumAmount color={AppColors.appGreen}>${formatToCurrency(crop[c.key], 0)}</MediumAmount>
          </Row>
        </Item>
      ))}
      <Item>
        <DarkRoundBackground>
          <Fill>
            <BoldItemText>Total Expenses</BoldItemText>
          </Fill>
          <MediumAmount>${formatToCurrency(crop.totalExpenses, 0)}</MediumAmount>
        </DarkRoundBackground>
      </Item>
    </ShadowCardButton>
  )
})

const {
  ShadowCardButton,
  Title,
  Row,
  GreyItemText,
  BoldItemText,
  Item,
  DarkRoundBackground,
  Fill,
  MediumAmount,
  Edit,
  SubText,
  EditIcon,
} = cropInfoStyles
export default CropExpensesCard
