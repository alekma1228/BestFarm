//
//  Screen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-07-17
//  Copyright © 2019 Croptomize. All rights reserved.

import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'
import { BlurView } from '@react-native-community/blur'

interface SwipeableModalProps {
  visible: boolean
  onDismiss: () => void
}

export class SwipeableModal extends React.Component<SwipeableModalProps> {
  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        swipeDirection={'down'}
        backdropColor={'white'}
        backdropOpacity={1}
        customBackdrop={this.renderBackdrop()}
        onSwipeComplete={this.props.onDismiss}
        onBackdropPress={this.props.onDismiss}
        style={styles.modal}
        propagateSwipe={true}
      >
        {this.props.children}
      </Modal>
    )
  }

  renderBackdrop = () => {
    return (
      <TouchableWithoutFeedback onPress={this.props.onDismiss}>
        <BlurView blurType="light" style={styles.backdrop} />
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    paddingTop: 105,
  },
  backdrop: {
    flexGrow: 1,
  },
})
