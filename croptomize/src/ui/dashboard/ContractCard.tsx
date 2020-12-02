import React from 'react'
import styled from 'styled-components/native'
import cropInfoStyles from './CropInfoStyles'
import { CropIcon } from '../components/CropIcon'
import { CropStore } from '../../stores/DashboardStore'
import ProgressBar from '../components/ProgressBar'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { formatToCurrency } from '../../utilities/currency'

type Props = { crop: CropStore }
const ContractCard: React.FC<Props> = ({ crop }) => {
  return (
    <Container>
      <Head>
        <CropIcon backgroundColor={crop.color} picture={crop.picture} style={{ width: 30, height: 30 }} />
        <Title>{crop.displayName}</Title>
      </Head>
      <ProgressBar progress={crop.progress} />
      <Row>
        <Amount>
          {formatToCurrency(crop.contractedBushels, 0)}/{formatToCurrency(crop.totalBushels, 0)}
        </Amount>
        <Text>{formatToCurrency(crop.numOfAcres, 0)} Acres</Text>
      </Row>
    </Container>
  )
}

const { ShadowCard } = cropInfoStyles
const Container = styled(ShadowCard)`
  margin: 0 20px;
  margin-bottom: 10px;
  padding: 10px;
`
const Head = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`
const Title = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${AppColors.navy};
  font-size: 18px;
  text-transform: uppercase;
  margin-left: 10px;
`
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`
const Text = styled.Text`
  font-family: ${AppFonts.semiBold};
  color: ${AppColors.navy};
`
const Amount = styled(Text)`
  flex: 1;
`
export default ContractCard
