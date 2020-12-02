import { SafeAreaView, View, StyleSheet, Image } from 'react-native'
import React from 'react'

export interface ViewProps {}

interface State {}

const INITIAL_STATE = {}

export class LoadingView extends React.Component<ViewProps, State> {
  constructor(props: ViewProps) {
    super(props)
    this.state = INITIAL_STATE
  }

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Image source={require('../../../assets/graph-loading-animation.gif')} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeView: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
