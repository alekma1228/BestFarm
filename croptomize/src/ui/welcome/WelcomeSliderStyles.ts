//
//  WelcomeSliderStyles.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import { AppColors, AppFonts } from '../styles/AppStyles'
import { StyleSheet } from 'react-native'

const welcomeStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 20,
  },
  logoMark: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: 191,
    height: 191,
  },
  emphasized: {
    fontWeight: '900',
    fontFamily: AppFonts.heading,
    color: AppColors.white,
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 10,
  },
  textbox: {
    justifyContent: 'flex-start',
    color: AppColors.white,
    alignSelf: 'center',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: AppFonts.body,
    lineHeight: 18,
    paddingTop: 0,
    marginTop: 0,
  },
})

export { welcomeStyles }
