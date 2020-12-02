import styled from 'styled-components/native'

//
//  AppStyles.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

const AppColors = {
  darkTextColor: 'black',
  darkTextDisabled: '#00000040',
  lightTextColor: 'white',
  appTealDark: '#1FA9C3',
  appTeal: '#3BBABF',
  appTealLight: '#52C4C9',
  appTealLightest: '#58C4C8',
  appPurple: '#AF3D8D',
  appGreen: '#3DAF84',
  backgroundCream: '#FCFAF3',
  inputBackground: 'rgba(0,0,0,0.06)',
  secondaryTextColor: 'grey',
  mediumTextColor: '#A8A8A8',
  darkSecondaryTextColor: '#404040',
  textInputColor: '#4A4E75',
  errorMessage: '#880000',
  deleteButton: '#F16464',
  white: '#FFFFFF',
  lightCream: '#FCFAF3',
  greyCream: '#F5F4EF',
  highlightColor: '#FFCE51',
  darkCream: '#F2F2E6',
  navy: '#1A3E61',
  lightNavy: '#476480', // variant used in some titles
  yellow: '#FFCE51',
  disabledYellow: '#FFE6A7',
  blue: '#C2E7E4',
  thinLine: '#E7E9E6',
  lightGreyText: '#8C9EAF',
  veryLightGrey: '#8CA0B3',
  lightRed: '#F16464',
  info: '#86d0ca',
  tutorialBackground: 'rgba(4, 4, 15, 0.16)',
}

const AppFonts = {
  heading: 'Montserrat-Bold',
  bold: 'Montserrat-Bold',
  button: 'Montserrat-SemiBold',
  semiBold: 'Montserrat-SemiBold',
  subheading: 'Montserrat-Medium',
  medium: 'Montserrat-Medium',
  body: 'Montserrat-Regular',
  regular: 'Montserrat-Regular',
  primaryButton: 'Montserrat-Regular',
}

const AppButton = styled.TouchableOpacity`
  background-color: ${props => (props.disabled ? AppColors.disabledYellow : AppColors.yellow)};
  border-radius: 20px;
  height: 40px;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 14px;
  padding-right: 14px;
`

const AppButtonText = styled.Text<{ disabled: boolean }>`
  text-align: center;
  font-size: 15px;
  font-family: ${AppFonts.button};
  font-weight: bold;
  color: ${props => (props.disabled ? AppColors.lightGreyText : AppColors.navy)};
`

const RoundedAppButton = styled(AppButton)`
  border-radius: 24px;
`

export { AppButton, AppButtonText, AppColors, AppFonts, RoundedAppButton }
