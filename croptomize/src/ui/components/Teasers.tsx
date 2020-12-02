import React, { FC } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { AppFonts, AppColors } from '../styles/AppStyles'

type Props = { text: string }
export const TeasersView: FC<Props> = React.memo(props => {
  const { text } = props
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Croptomize</Text>
        <View style={styles.proView}>
          <Text style={styles.proBanner}>PRO</Text>
        </View>
      </View>
      <Text style={styles.description}>{text}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignContent: 'center',
    backgroundColor: AppColors.navy,
    borderRadius: 5,
    padding: 12,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    color: AppColors.lightTextColor,
    fontFamily: AppFonts.semiBold,
    fontSize: 15,
    textAlign: 'center',
  },
  proView: {
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: AppColors.info,
  },
  proBanner: {
    color: AppColors.lightTextColor,
    fontFamily: AppFonts.semiBold,
    fontSize: 11,
    textAlign: 'center',
    paddingLeft: 7,
    paddingRight: 7,
  },
  description: {
    marginTop: 5,
    color: AppColors.lightTextColor,
    fontFamily: AppFonts.regular,
    fontSize: 13,
    textAlign: 'center',
  },
})
