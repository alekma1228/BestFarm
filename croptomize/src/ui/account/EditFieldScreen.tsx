//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { EditFieldProps } from './EditFieldProps'
import { Button } from 'react-native-elements'
import { AppFonts } from '../styles/AppStyles'

interface EditFieldComponentState {
  text: string
}

export class EditFieldScreen extends React.Component<EditFieldProps, EditFieldComponentState> {
  constructor(props: Readonly<EditFieldProps>) {
    super(props)
    this.state = { text: '[Field Name]' }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 48,
            borderColor: '#86D0CA',
            borderWidth: 1,
            backgroundColor: '#F2F2E6',
            paddingLeft: 17,
            color: '#8C9EAF',
            fontSize: 13,
            fontFamily: AppFonts.subheading,
            marginHorizontal: 24,
            marginTop: 24,
            borderRadius: 10,
          }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          clearTextOnFocus
        />
        <Button
          buttonStyle={{
            height: 44,
            marginHorizontal: 24,
            marginTop: 21,
            backgroundColor: '#FFCE51',
            justifyContent: 'center',
            borderRadius: 22,
          }}
          titleStyle={styles.buttonText}
          title={'Save'}
        />
        <Button
          buttonStyle={{
            backgroundColor: 'transparent',
            marginTop: 10,
            marginHorizontal: 100,
            justifyContent: 'center',
          }}
          titleStyle={styles.buttonText}
          title={'Cancel'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FCFAF3',
  },
  buttonText: {
    fontSize: 15,
    color: '#1A3E61',
    fontFamily: AppFonts.heading,
    textAlign: 'center',
  },
})
