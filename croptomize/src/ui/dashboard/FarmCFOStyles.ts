import styled from 'styled-components/native'
import { AppColors, AppFonts } from '../styles/AppStyles'

const Scroll = styled.ScrollView`
  flex: 1;
`
const Row = styled.View`
  flex-direction: row;
  margin: 0px 20px;
  justify-content: space-between;
`
const MiddleSpace = styled.View`
  width: 15px;
`
const Head = styled.View`
  justify-content: center;
  margin: 0px 20px;
  margin-top: 10px;
  padding: 10px 0px;
`
const Title = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${AppColors.navy};
  text-align: center;
  font-size: 15px;
  margin-bottom: 5px;
`
const Sub = styled.Text`
  font-family: ${AppFonts.regular};
  color: ${AppColors.lightNavy};
  font-size: 12px;
  text-align: center;
`
const BottomView = styled.View`
  background-color: ${AppColors.darkCream};
  flex: 1;
  padding-top: 10px;
  padding-bottom: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
const CategoryContainer = styled.View`
  margin-top: 15px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;
`
const Profits = styled.View`
  border-radius: 5px;
  border-left-width: 10px;
  height: 40px;
  flex: 1;
  margin-top: 15px;
  background-color: ${AppColors.backgroundCream};
  border-color: ${AppColors.appGreen};
  shadow-color: ${AppColors.navy};
  shadow-radius: 3px;
  shadow-opacity: 0.2;
  shadow-offset: 3px 3px;
  flex-direction: row;
  align-items: center;
`
const ProfitText = styled.Text`
  font-family: ${AppFonts.semiBold};
  color: ${AppColors.lightNavy};
  margin-left: 10px;
  flex: 1;
`
const ProfitAmount = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${AppColors.navy};
  font-size: 20px;
  margin-right: 10px;
`
const Button = styled.TouchableOpacity`
  max-height: 50px;
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  justify-content: center;
  padding-left: 15px;
  border-radius: 5px;
  background-color: ${AppColors.backgroundCream};
`
const ButtonText = styled.Text`
  font-family: ${AppFonts.bold};
  color: ${AppColors.navy};
`

const farmCFOStyles = {
  Scroll,
  Row,
  Title,
  Sub,
  Head,
  BottomView,
  CategoryContainer,
  Button,
  ButtonText,
  MiddleSpace,
  Profits,
  ProfitText,
  ProfitAmount,
}
export default farmCFOStyles
