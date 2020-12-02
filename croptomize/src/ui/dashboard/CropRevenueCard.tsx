import React, { useCallback, useEffect } from 'react'
import cropInfoStyles from './CropInfoStyles'
import { formatToCurrency } from '../../utilities/currency'
import { CropStore } from 'src/stores/DashboardStore'
import { AppColors } from '../styles/AppStyles'
import { useNavigation } from 'react-navigation-hooks'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { observer } from 'mobx-react-lite'

type Props = { crop: CropStore }
const CropRevenueCard: React.FC<Props> = observer(({ crop }) => {
  const rootNavigation = (useNavigation() as any).getScreenProps().rootNavigation
  const toRevenue = useCallback(
    () =>
      rootNavigation.navigate(DashboardScreenNames.EditCropRevenue, {
        key: crop.symbolPrefix,
        displayName: crop.displayName,
      }),
    [],
  )
  useEffect(() => {
    crop.CBOTValueForCrop()
  }, [])
  return (
    <ShadowCardButton onPress={toRevenue}>
      <Item>
        <Row paddingRight={10}>
          <Title>Contracted Revenue</Title>
          <Edit>Edit</Edit>
          <EditIcon />
        </Row>
        <SubText>Based on expected crop yields.</SubText>
      </Item>
      <Item>
        <Row paddingRight={10}>
          <GreyItemText>Contracted Bushels</GreyItemText>
          <MediumAmount color={AppColors.appGreen}>
            {formatToCurrency(crop.contractedBushels, 0)} <Unit>bu</Unit>
          </MediumAmount>
        </Row>
      </Item>
      <Item>
        <Row paddingRight={10}>
          <GreyItemText>Average Sale Price</GreyItemText>
          <MediumAmount color={AppColors.appGreen}>
            ${formatToCurrency(crop.avgSale)}/<Unit>bu</Unit>
          </MediumAmount>
        </Row>
      </Item>
      <Item>
        <DarkRoundBackground>
          <Fill>
            <BoldItemText>Contracted Revenue</BoldItemText>
          </Fill>
          <MediumAmount>${formatToCurrency(crop.contractedRevenue, 0)}</MediumAmount>
        </DarkRoundBackground>
      </Item>
      <Item>
        <Row paddingRight={10}>
          <Title>Projected Revenue</Title>
        </Row>
        <SubText>Value of unsold bushels based on today's market price + your local basis.</SubText>
      </Item>
      <Item>
        <Row paddingRight={10}>
          <GreyItemText>Remaining Bushels</GreyItemText>
          <MediumAmount>
            {formatToCurrency(crop.remainingBushels, 0)} <Unit>bu</Unit>
          </MediumAmount>
        </Row>
      </Item>
      <Item>
        <Row paddingRight={10}>
          <GreyItemText>Local Cash Price</GreyItemText>
          <MediumAmount>${formatToCurrency(crop.cbotValue - crop.projectedBasis)}</MediumAmount>
        </Row>
      </Item>
      <Item>
        <DarkRoundBackground>
          <Fill>
            <BoldItemText>Projected Revenue</BoldItemText>
          </Fill>
          <MediumAmount>${formatToCurrency(crop.potentialRevenue, 0)}</MediumAmount>
        </DarkRoundBackground>
      </Item>
      <Item>
        <DarkRoundBackground>
          <Fill>
            <BoldItemText>Total Projected Revenue</BoldItemText>
          </Fill>
          <MediumAmount>${formatToCurrency(crop.contractedRevenue + crop.potentialRevenue, 0)}</MediumAmount>
        </DarkRoundBackground>
      </Item>
    </ShadowCardButton>
  )
})

const {
  ShadowCardButton,
  Title,
  Row,
  Unit,
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
export default CropRevenueCard
