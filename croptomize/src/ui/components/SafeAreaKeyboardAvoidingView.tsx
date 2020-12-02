//
//  LoginContainer.ts
//  Croptomize
//
//  Created by Modern Logic on 2019-06-04
//  Copyright © 2019 Connect the Grey. All rights reserved.

import React from 'react'
import { View, Keyboard, EmitterSubscription, ViewStyle, StatusBar } from 'react-native'
import SafeAreaView, { SafeAreaViewForceInsetValue } from 'react-native-safe-area-view'

interface SafeAreaKeyboardAvoidingViewProps {
  style?: ViewStyle
  bottomSafeAreaColor?: string
}

interface SafeAreaKeyboardAvoidingViewState {
  keyboardHeight: number
}

export class SafeAreaKeyboardAvoidingView extends React.Component<
  SafeAreaKeyboardAvoidingViewProps,
  SafeAreaKeyboardAvoidingViewState
> {
  keyboardWillShowSub?: EmitterSubscription
  keyboardWillHideSub?: EmitterSubscription

  constructor(props: {}) {
    super(props)
    this.state = {
      keyboardHeight: 0,
    }
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    const keyboardWillShowSub = this.keyboardWillShowSub
    if (keyboardWillShowSub) {
      keyboardWillShowSub.remove()
    }
    const keyboardWillHideSub = this.keyboardWillHideSub
    if (keyboardWillHideSub) {
      keyboardWillHideSub.remove()
    }
  }

  keyboardWillShow = (event: any) => {
    this.setState({
      keyboardHeight: event.endCoordinates.height,
    })
  }

  keyboardWillHide = (_: any) => {
    this.setState({
      keyboardHeight: 0,
    })
  }

  render() {
    const keyboardHeight = this.state.keyboardHeight
    const baseStyle = this.props.style || {}
    const bottomSafeAreaColor = this.props.bottomSafeAreaColor || '#00000000'
    const never = 'never' as SafeAreaViewForceInsetValue
    const always = 'always' as SafeAreaViewForceInsetValue
    const forceInset = { top: never, bottom: always }
    const keyboardGray = '#d1d3d9'

    return (
      <View
        style={[
          baseStyle,
          { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignContent: 'stretch', alignItems: 'center' },
        ]}
      >
        <StatusBar hidden={true} />
        {this.props.children}
        {(this.state.keyboardHeight === 0 && (
          <SafeAreaView
            style={{ backgroundColor: bottomSafeAreaColor, alignSelf: 'stretch' }}
            forceInset={forceInset}
          ></SafeAreaView>
        )) || <View style={{ alignSelf: 'stretch', height: keyboardHeight, backgroundColor: keyboardGray }}></View>}
      </View>
    )
  }
}
