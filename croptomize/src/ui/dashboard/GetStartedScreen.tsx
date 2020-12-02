import React, { useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import { AppFonts, AppColors } from '../styles/AppStyles'
import { YellowButton } from '../components/YellowButton'
import { NavigationScreenProps } from 'react-navigation'
import CFOTutorialScreen from './CFOTutorialScreen'
import { UIStore } from '../../stores/UIStore'

type Props = {
  uiStore: UIStore
  onGetStarted: () => void
} & NavigationScreenProps
const GetStartedScreen: React.FC<Props> = observer(props => {
  const { uiStore } = props
  const onGetStarted = useCallback(() => {
    props.onGetStarted()
  }, [])
  useEffect(() => {
    props.navigation.setParams({ removeButtons: true })
    return () => {
      props.navigation.setParams({ removeButtons: false })
    }
  }, [])
  return (
    <Container>
      <Text>Get Started With Farm CFO Today!</Text>
      <DescriptionText>
        Welcome to Farm CFO, where you can see your farm's overall profitability at a glance.
      </DescriptionText>
      <YellowButton text="Get Started" onPress={onGetStarted} />

      <CFOTutorialScreen uiStore={uiStore} />
    </Container>
  )
})

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: ${AppColors.darkCream};
`
// const Video = styled.View`
//   background-color: ${AppColors.darkTextColor};
//   height: 35%;
//   margin: 30px 0;
// `

const Text = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${AppColors.navy};
  font-size: 20px;
  width: 60%;
  text-align: center;
  align-self: center;
`

const DescriptionText = styled.Text`
  font-family: ${AppFonts.regular};
  color: ${AppColors.navy};
  font-size: 16px;
  margin-top: 26px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
  text-align: center;
  align-self: center;
`

export default GetStartedScreen
