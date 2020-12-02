import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'

type Props = { text: string; onPress: () => void; outline?: boolean }
export const YellowButton: React.FC<Props> = React.memo(props => (
  <TouchableOpacity style={[styles.button, props.outline ? styles.outline : styles.yellow]} onPress={props.onPress}>
    <Text style={styles.text}>{props.text}</Text>
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 30,
    shadowColor: AppColors.navy,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  yellow: {
    backgroundColor: AppColors.yellow,
  },
  outline: {
    backgroundColor: AppColors.backgroundCream,
    borderWidth: 3,
    borderColor: AppColors.navy,
  },
  text: {
    fontFamily: AppFonts.bold,
    color: AppColors.navy,
    textAlign: 'center',
  },
})
