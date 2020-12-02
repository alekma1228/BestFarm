import React from 'react'
import cropInfoStyles from './CropInfoStyles'
import { formatToCurrency } from '../../utilities/currency'

const TEXT = ['Total Profit', 'Contracted Revenue', 'Total Expenses']
// amounts = [profit, revenue, expenses]
type Props = { year: number; name: string; amounts: number[] }
const CropFinanceCard: React.FC<Props> = ({ year, name, amounts }) => {
  return (
    <ShadowCard>
      <Item>
        <Title>
          {year} {name} Finance
        </Title>
      </Item>
      {amounts.map((a, i) => (
        <Item key={i}>
          <DarkRoundBackground>
            <Fill>
              <BoldItemText>{TEXT[i]}</BoldItemText>
            </Fill>
            <MediumAmount>${formatToCurrency(a, 0)}</MediumAmount>
          </DarkRoundBackground>
        </Item>
      ))}
    </ShadowCard>
  )
}

const { ShadowCard, Title, BoldItemText, Item, DarkRoundBackground, Fill, MediumAmount } = cropInfoStyles
export default CropFinanceCard
