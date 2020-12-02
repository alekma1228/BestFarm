import styled from 'styled-components/native'
import { AppFonts, AppColors } from '../styles/AppStyles'
import { extractProp } from '../../utilities/recipes'
import { Keyboard } from 'react-native'

const Dismiss = styled.TouchableWithoutFeedback.attrs(() => ({ onPress: Keyboard.dismiss }))`
  flex: 1;
`
const Container = styled.ScrollView`
  flex-grow: 1;
  background-color: ${AppColors.backgroundCream};
`
const Label = styled.Text`
  font-family: ${AppFonts.semiBold};
  color: ${AppColors.navy};
  min-width: 40%;
  margin-right: 20px;
  align-self: center;
`
const Item = styled.View`
  flex-direction: row;
  height: 80px;
  padding: 15px 0;
  margin: 0 20px 0 30px;
  border-bottom-width: ${extractProp<{ bWidth?: number }>('bWidth', 0)}px;
  border-color: ${AppColors.thinLine};
`
const InputView = styled.View`
  align-items: stretch;
  justify-content: center;
  flex: 1;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${AppColors.thinLine};
  background-color: ${AppColors.darkCream};
`
const Input = styled.TextInput`
  font-family: ${AppFonts.regular};
  color: ${AppColors.lightNavy};
  font-size: 15px;
  padding-left: 15px;
  height: 100%;
`
const Empty = styled.View`
  flex: 1;
  background-color: ${AppColors.backgroundCream};
`
const Margin = styled.View`
  padding: 10px 20px;
  background-color: ${AppColors.backgroundCream};
`

const editCropRevenueStyles = { Container, Label, Item, InputView, Input, Empty, Margin, Dismiss }
export default editCropRevenueStyles
