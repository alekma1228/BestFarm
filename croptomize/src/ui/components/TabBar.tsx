import React, { useRef, useState, useCallback } from 'react'
import { View, Dimensions, StyleSheet, Animated, LayoutRectangle } from 'react-native'
import Tab from './Tab'
import { NavigationScreenProps, NavigationState } from 'react-navigation'

const HALF_SCREEN = Dimensions.get('window').width * 0.5

type AnimScroll = typeof Animated.ScrollView
type Props = {
  position: Animated.Value
  interpolate: Animated.AnimatedInterpolation
  navigationState: NavigationState
} & NavigationScreenProps
const TabBar: React.FC<Props> = props => {
  const { navigationState, navigation, position, interpolate } = props
  const { routes, index } = navigationState
  const { contentContainerStyle, scrollViewStyle } = styles
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const scroll = useRef<AnimScroll>(null)
  const onPress = useCallback(
    (routeName: string) => (layout: LayoutRectangle) => {
      navigation.navigate(routeName)
      const x = layout.x - HALF_SCREEN + layout.width * 0.5
      if (scroll.current) {
        scroll.current.getNode().scrollTo({ x, animated: true })
      }
    },
    [],
  )
  // proper size of empty spaces based on first & last element
  const onRender = useCallback((i, width) => {
    if (i === 0) {
      setStart(HALF_SCREEN - width * 0.5)
    }
    if (i === routes.length - 1) {
      setEnd(HALF_SCREEN - width * 0.5)
    }
  }, [])
  return (
    <Animated.ScrollView
      horizontal
      scrollEnabled={false}
      ref={scroll}
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      style={{ ...scrollViewStyle, backgroundColor: interpolate }}
    >
      <View style={{ width: start }} />
      {routes.map((route, i) => {
        const focusAnim = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0, 1, 0],
        })
        return (
          <Tab
            key={route.key}
            focusAnim={focusAnim}
            selected={index === i}
            index={i}
            onRender={onRender}
            route={route as any}
            onPress={onPress(route.routeName)}
          />
        )
      })}
      <View style={{ width: end }} />
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scrollViewStyle: {
    maxHeight: 60,
  },
})

export default React.memo(TabBar, (prev, current) => prev.navigationState.index === current.navigationState.index)
