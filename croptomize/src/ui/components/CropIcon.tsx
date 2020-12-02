import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { AppColors } from '../styles/AppStyles'

interface CropIconProps {
  backgroundColor: string
  picture: any
  style?: any
  pictureStyle?: any
}

export const CropIcon = (props: CropIconProps) => {
  return (
    <View
      style={[styles.cropIconContainer, { backgroundColor: props.backgroundColor }, props.style ? props.style : {}]}
    >
      <Image style={[styles.cropIcon, props.pictureStyle]} source={props.picture} />
    </View>
  )
}

const styles = StyleSheet.create({
  cropIcon: {
    alignSelf: 'center',
    tintColor: AppColors.white,
  },
  cropIconContainer: {
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
})
