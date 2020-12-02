import React from 'react'
import { Modal, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { Button, Icon } from 'react-native-elements'
import { AppFonts, AppColors } from '../styles/AppStyles'

interface ModalPopupProps {
  title: string
  message?: string
  iconName?: string
  buttonText: string
  visible: boolean
  hideExitButton?: boolean
  onDismiss: () => void
  onButtonPress?: () => void
}

export const ModalPopup: React.FC<ModalPopupProps> = props => {
  const { title, iconName, hideExitButton, message, buttonText, visible, onDismiss, onButtonPress, children } = props
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <BlurView blurType="light" style={styles.contentWrap}>
        <View style={styles.container}>
          {!hideExitButton && (
            <TouchableOpacity onPress={() => onDismiss && onDismiss()}>
              <Image source={require('../../../assets/close.png')} style={styles.exitIcon} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
          {iconName && <Icon color={AppColors.navy} name={iconName} type={'fontawesome'} size={20} />}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={{ flex: 1 }} />
          {children}
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title={buttonText}
            onPress={() => (onButtonPress ? onButtonPress() : onDismiss())}
          />
        </View>
      </BlurView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FCFAF3',
    marginHorizontal: 24,
    height: 236,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  exitIcon: {
    height: 13,
    width: 13,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 25,
  },
  title: {
    fontFamily: AppFonts.heading,
    fontSize: 28,
    color: '#1A3E61',
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: '80%',
    marginTop: 26,
  },
  probabilityImage: {
    height: 149,
    width: 149,
    alignSelf: 'center',
    marginTop: 32,
    justifyContent: 'center',
  },
  percent: {
    textAlign: 'center',
    fontSize: 38,
    fontFamily: AppFonts.heading,
    color: '#1A3E61',
  },
  bold: {
    fontFamily: AppFonts.heading,
  },
  message: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: AppFonts.subheading,
    color: '#1A3E61',
    marginHorizontal: 30,
    marginTop: 19,
  },
  button: {
    height: 54,
    backgroundColor: '#FFCE51',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonTitle: {
    fontSize: 15,
    color: '#1A3E61',
    fontFamily: AppFonts.heading,
    textAlign: 'center',
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
