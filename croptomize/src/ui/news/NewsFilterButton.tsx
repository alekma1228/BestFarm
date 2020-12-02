import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors } from '../styles/AppStyles'

interface NewsFilterButtonProps {
  onPress: () => void
}

export const NewsFilterButton = (props: NewsFilterButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <FontAwesome5 name="sliders-h" color={AppColors.navy} size={26} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  icon: {
    tintColor: AppColors.navy,
  },
})
