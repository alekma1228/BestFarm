import styled from 'styled-components/native'
import { AppColors, AppFonts } from '../styles/AppStyles'
import MaterialI from 'react-native-vector-icons/MaterialIcons'
import { extractProp } from '../../utilities/recipes'
import { isIphoneX } from '../../utilities/safe_area'

const AvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  keyboardVerticalOffset: 45 + (isIphoneX() ? 44 : 0),
})`
  flex: 1;
`
const Row = styled.View<{ paddingRight?: number }>`
  align-items: center;
  flex-direction: row;
`
const ShadowCard = styled.View`
  shadow-offset: 3px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: ${AppColors.navy};
  background-color: ${AppColors.lightCream};
  border-radius: 5px;
  margin-bottom: 24px;
`
const ShadowCardButton = styled.TouchableOpacity`
  shadow-offset: 3px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: ${AppColors.navy};
  background-color: ${AppColors.lightCream};
  border-radius: 5px;
  margin-bottom: 24px;
`
const Title = styled.Text`
  font-family: ${AppFonts.bold};
  font-size: 16px;
  padding-left: 10px;
  color: ${AppColors.navy};
  flex: 1;
`
const BoldItemText = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${AppColors.lightNavy};
`
const GreyItemText = styled.Text`
  font-family: ${AppFonts.semiBold};
  color: ${AppColors.lightNavy};
  padding-left: 10px;
  flex: 1;
`
const Item = styled.View<{ leftWidth?: number; color?: string }>`
  padding: 10px;
  min-height: 40px;
  border-left-width: ${extractProp('leftWidth', 0)}px;
  border-left-color: ${extractProp('color', 'black')}
  border-bottom-width: 1px;
  border-bottom-color: ${AppColors.thinLine};
`
const DarkRoundBackground = styled.View`
  flex: 1;
  padding: 5px 10px;
  background-color: ${AppColors.darkCream};
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
`
const Fill = styled.View`
  flex: 1;
  justify-content: center;
`
const MediumAmount = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${extractProp<{ color?: string }>('color', AppColors.navy)};
  font-size: 17px;
`
const Edit = styled.Text`
  font-family: ${AppFonts.bold};
  font-size: 13px;
  color: ${AppColors.appGreen};
`
const EditIcon = styled(MaterialI).attrs({
  name: 'edit',
  size: 14,
  color: AppColors.appGreen,
})``
const InfoIcon = styled(MaterialI).attrs({
  name: 'info',
  size: 12,
  color: AppColors.lightNavy,
})``
const SubText = styled.Text`
  font-family: ${AppFonts.body};
  color: ${AppColors.lightGreyText};
  font-size: 11px;
  padding-left: 10px;
  margin-top: 5px;
`
const Unit = styled.Text`
  font-size: 13px;
`

const cropInfoStyles = {
  ShadowCard,
  SubText,
  Title,
  BoldItemText,
  Item,
  DarkRoundBackground,
  Fill,
  Unit,
  MediumAmount,
  EditIcon,
  Row,
  Edit,
  GreyItemText,
  ShadowCardButton,
  InfoIcon,
  AvoidingView,
}
export default cropInfoStyles
