import React from 'react'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { Image, TouchableHighlight, View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface DropDownButtonProps {
  action: () => any
  iconName?: string
  text: string
  style?: any
  disabled?: boolean
}

export function DropDownButton(props: DropDownButtonProps) {
  return (
    <TouchableHighlight
      onPress={props.action}
      disabled={props.disabled}
      style={[styles.headerButton, props.style, props.disabled && { backgroundColor: AppColors.lightGreyText }]}
    >
      <View style={styles.dropDownButtonContainer}>
        <View style={styles.dropDownButtonLeft}>
          {props.iconName && (
            <Icon name={props.iconName} color={'white'} size={20} style={styles.renderDropDownButtonIconStyle} />
          )}
          <Text style={styles.whiteText}>{props.text}</Text>
        </View>
        <Image style={styles.chevron} source={require('../../../assets/chevron-down.png')} />
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  dropDownButtonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  dropDownButtonLeft: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderDropDownButtonIconStyle: {
    marginRight: 10,
  },
  headerButton: {
    borderRadius: 5,
    marginTop: 13,
    height: 50,
    backgroundColor: AppColors.navy,
  },
  whiteText: {
    fontSize: 15,
    color: AppColors.white,
    fontFamily: AppFonts.bold,
  },
  chevron: {
    width: 16,
    height: 11,
    marginRight: 12,
    tintColor: AppColors.white,
  },
})
