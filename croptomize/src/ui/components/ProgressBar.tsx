import React from 'react'
import styled from 'styled-components/native'
import { AppColors } from '../styles/AppStyles'
import { extractProp } from '../../utilities/recipes'

type Props = { progress: number }
const ProgressBar: React.FC<Props> = ({ progress }) => (
  <Container>
    <Progress progress={progress} />
  </Container>
)

const Container = styled.View`
  width: 100%;
  height: 15px;
  background-color: ${AppColors.thinLine};
  border-radius: 5px;
  border-width: 2px;
  border-color: ${AppColors.thinLine};
  flex-direction: row;
`
const Progress = styled.View`
  width: ${extractProp<{ progress: number }>('progress')}%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 5px;
  background-color: ${AppColors.info};
`
export default ProgressBar
