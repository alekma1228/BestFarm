import React, { useCallback } from 'react'
import { AppFonts, AppColors } from '../styles/AppStyles'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import { NavigationScreenProps } from 'react-navigation'
import { withStoreContext } from '../../stores/StoreContext'
import { YellowButton } from '../components/YellowButton'
import { FramesScreenNames } from './FramesScreenNames'

type Props = {} & NavigationScreenProps
const GetNowScreen: React.FC<Props> = observer(props => {
  const toPurchase = useCallback(() => props.navigation.navigate(FramesScreenNames.Purchase), [])

  return (
    <Container>
      <Title>Get The Croptomize Frames Now</Title>
      <SubTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat cursus odio in rhoncus. Maecenas massa
      </SubTitle>
      <YellowButton text="Purchase Croptomize Frames" onPress={toPurchase} />
    </Container>
  )
})

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: ${AppColors.darkCream};
`
const Title = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${AppColors.navy};
  font-size: 20px;
  width: 80%;
  text-align: center;
  align-self: center;
`
const SubTitle = styled(Title)`
  font-size: 16px;
  font-family: ${AppFonts.medium};
  margin: 30px 0;
`

export default withStoreContext(GetNowScreen, () => ({}))
