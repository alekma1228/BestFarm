import React from 'react'
import { ViewProps, View, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { Text } from 'react-native-elements'
import { CFOTutorialStyles } from './CFOTutorialSliderStyle'
import { AppFonts, AppColors } from '../styles/AppStyles'

interface CFOTutorialSliderProps extends ViewProps {
  title: string
  message: string
  image: ImageSourcePropType
  pageNumber: number
}

export class CFOTutorialSliderComponent extends React.Component<CFOTutorialSliderProps> {
  render() {
    const { pageNumber } = this.props
    return (
      <View style={[CFOTutorialStyles.container, this.props.style]}>
        <Text style={styles.header}>{this.props.title}</Text>
        {pageNumber === 5 ? (
          <View>
            <View style={{ height: 10 }} />
            <Text style={styles.subDescription}>{this.props.message}</Text>
            <View style={{ height: 10 }} />
            <Text style={styles.subDescription}>
              <Text style={{ fontWeight: 'bold' }}>1. Land: </Text>
              Annualized cash rents fixed land
            </Text>
            <Text style={styles.subDescription}>
              <View style={{ width: 20 }} />
              <Text style={{ paddingLeft: 40 }}>payments per acre</Text>
            </Text>
            <Text style={styles.subDescription}>
              <Text style={{ fontWeight: 'bold' }}>2. Agronomy: </Text> Seed, chemicals, etc.
            </Text>
            <Text style={styles.subDescription}>
              <Text style={{ fontWeight: 'bold' }}>3. Operations: </Text> equipment, fuel, etc
            </Text>
            <Text style={styles.subDescription}>
              <Text style={{ fontWeight: 'bold' }}>4. Interest and Insurance</Text>
            </Text>
            <Text style={styles.subDescription}>
              <Text style={{ fontWeight: 'bold' }}>5. Labor/Living Expenses/Misc</Text>
            </Text>
          </View>
        ) : (
          <Text style={styles.description}>{this.props.message}</Text>
        )}
        <Image source={this.props.image} style={styles.image} />
        <View style={{ height: 80 }} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: AppColors.navy,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: AppFonts.semiBold,
  },
  description: {
    marginTop: 15,
    fontSize: 13,
    color: AppColors.navy,
    textAlign: 'center',
    fontFamily: AppFonts.regular,
  },
  subDescription: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 13,
    color: AppColors.navy,
    fontFamily: AppFonts.regular,
  },
  image: {
    marginTop: 30,
    marginBottom: 25,
  },
})
