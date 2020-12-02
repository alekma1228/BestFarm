import React, { useRef, useCallback } from 'react'
import { Animated, Text, TouchableOpacity, StyleSheet, LayoutRectangle } from 'react-native'
import { AppColors } from '../styles/AppStyles'

type Props = {
  focusAnim: Animated.AnimatedInterpolation
  route: { key: string; routeName: string; params: { title: string } }
  selected: boolean
  index: number
  onRender: (i: number, width: number) => void
  onPress: (layout: LayoutRectangle) => void
}
const Tab: React.FC<Props> = props => {
  const { focusAnim, onPress, route, onRender, index, selected } = props
  const layout = useRef<LayoutRectangle>({ height: 0, width: 0, x: 0, y: 0 })
  const { title } = route.params
  const { textStyle, viewStyle } = styles
  // when swiping navigation, also scroll to tab
  if (selected) {
    onPress(layout.current)
  }
  const color = selected ? AppColors.lightCream : 'rgba(255,255,255,0.5)'
  const borderBottomWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  })
  const onLayout = useCallback((e: any) => {
    const _layout = e.nativeEvent.layout as LayoutRectangle
    layout.current = _layout
    onRender(index, _layout.width)
  }, [])
  return (
    <TouchableOpacity onLayout={onLayout} onPress={() => onPress(layout.current)}>
      <Animated.View style={{ ...viewStyle, borderBottomWidth }}>
        <Text style={{ ...textStyle, color }}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: AppColors.lightCream,
  },
})

export default Tab
