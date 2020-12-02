import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { AppColors } from '../styles/AppStyles'
import { Button } from 'react-native-elements'

interface BackButtonProps {
  onPress: () => void
}

export const BackButton = (props: BackButtonProps) => {
  return (
    <Button
      buttonStyle={styles.container}
      icon={<Image style={styles.icon} source={require('../../../assets/chevron-left.png')} />}
      onPress={props.onPress}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.lightCream,
  },
  icon: {
    tintColor: AppColors.navy,
    height: 18,
    width: 12,
  },
})
