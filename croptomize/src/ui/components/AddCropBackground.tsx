import React from 'react'
import { View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { YellowButton } from '../components/YellowButton'

const SCREEN_HEIGHT = Dimensions.get('window').height

type Props = { title: string; subtitle: string; cardTitle: string; buttonTitle?: string; onPress?: () => void }
const AddCropBackground: React.FC<Props> = props => {
  const { title, subtitle, children, cardTitle, onPress = () => {}, buttonTitle } = props
  return (
    <View style={containerStyle}>
      <View style={topStyle}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={subtitleStyle}>{subtitle}</Text>
      </View>
      <View style={cardStyle.container}>
        <View style={cardStyle.titleView}>
          <Text style={cardStyle.title}>{cardTitle}</Text>
        </View>
        <ScrollView style={scrollStyle}>{children}</ScrollView>
      </View>
      {buttonTitle ? (
        <React.Fragment>
          <View style={emptyStyle} />
          <View style={buttonStyle}>
            <YellowButton onPress={onPress} text={buttonTitle} />
          </View>
        </React.Fragment>
      ) : null}
    </View>
  )
}

const { containerStyle, topStyle, titleStyle, subtitleStyle, scrollStyle, emptyStyle, buttonStyle } = StyleSheet.create(
  {
    containerStyle: {
      flex: 1,
      backgroundColor: AppColors.darkCream,
    },
    topStyle: {
      backgroundColor: AppColors.navy,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      paddingLeft: 40,
      paddingRight: 40,
    },
    titleStyle: {
      color: AppColors.lightTextColor,
      fontFamily: AppFonts.medium,
      fontSize: 22,
      width: '100%',
      textAlign: 'center',
      marginTop: 30,
    },
    subtitleStyle: {
      color: AppColors.lightTextColor,
      fontFamily: AppFonts.regular,
      width: '100%',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: SCREEN_HEIGHT * 0.1,
    },
    scrollStyle: {
      paddingLeft: 20,
    },
    emptyStyle: {
      flex: 1,
    },
    buttonStyle: {
      marginLeft: 20,
      marginRight: 20,
    },
  },
)

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: AppColors.backgroundCream,
    marginTop: -SCREEN_HEIGHT * 0.08,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: AppColors.navy,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  titleView: {
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.thinLine,
  },
  title: {
    fontFamily: AppFonts.regular,
    color: AppColors.lightNavy,
  },
})

export default AddCropBackground
