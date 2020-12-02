import React, { useEffect, useRef, useCallback } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'

type Props = {
  text: string
  value: string
  onChangeText: (value: string) => void
  prefix?: string
  posfix?: string
  itemStyle?: ViewStyle
  leftTextStyle?: TextStyle
  amountStyle?: TextStyle
  decimals?: number
  focus?: boolean
}
const AddCropInput: React.FC<Props> = props => {
  const ref = useRef<TextInput>(null)
  const {
    text,
    value,
    onChangeText,
    prefix,
    posfix,
    itemStyle = {},
    leftTextStyle = {},
    amountStyle = {},
    focus = false,
  } = props
  useEffect(() => {
    if (focus) {
      setTimeout(doFocus, 500)
    }
  }, [focus])
  const doFocus = useCallback(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [ref.current])
  return (
    <TouchableOpacity style={buttonStyle} onPress={doFocus}>
      <View style={[containerStyle, itemStyle]}>
        <Text style={[textStyle, leftTextStyle]}>{text}</Text>
        {prefix ? <Text style={[fontStyle, amountStyle]}>{prefix}</Text> : null}
        <TextInput
          ref={ref}
          style={[fontStyle, amountStyle]}
          onChangeText={onChangeText}
          value={value}
          clearTextOnFocus
          keyboardType="numeric"
        />
        {posfix ? <Text style={[fontStyle, amountStyle]}>{posfix}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}

const { buttonStyle, fontStyle, textStyle, containerStyle } = StyleSheet.create({
  buttonStyle: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: AppColors.thinLine,
  },
  containerStyle: {
    flex: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    color: AppColors.navy,
    fontFamily: AppFonts.semiBold,
    fontSize: 12,
  },
  fontStyle: {
    fontFamily: AppFonts.regular,
    color: AppColors.lightNavy,
  },
})

export default AddCropInput
