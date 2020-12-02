import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import { NavigationScreenProps } from 'react-navigation'
import { withStoreContext } from '../../stores/StoreContext'

type Props = {} & NavigationScreenProps
const FramesHomeScreen: React.FC<Props> = observer(() => {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  )
})

const Container = styled.View`
  flex: 1;
`
const Text = styled.Text``

export default withStoreContext(FramesHomeScreen, () => ({}))
