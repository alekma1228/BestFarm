//
//  SelectBasisScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-08-30
//  Copyright © 2019 Connect the Grey. All Rights Reserved.

import React from 'react'
import { StyleSheet, View, FlatList, Keyboard, Text, TouchableHighlight, TextInput, Linking } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { SelectBasisProps } from './SelectBasisProps'
import { AddingCropScreenNames } from '../navigation/AddingCropScreenNames'
import { observer } from 'mobx-react'
import { GrainBidsResult } from '../../services/MarketDataService'
import { LoadingView } from '../components/LoadingView'
import { Button } from 'react-native-elements'
import styled from 'styled-components/native'
import { AppColors, AppFonts } from '../styles/AppStyles'

interface SelectBasisState {
  zipCode: string
}

@observer
export class SelectBasisScreen extends React.Component<SelectBasisProps, SelectBasisState> {
  constructor(props: SelectBasisProps) {
    super(props)
    this.state = { zipCode: '' }
  }

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1, backgroundColor: '#FCFAF3' }}>
        <View style={{ flex: 1, backgroundColor: '#F2F2E6' }}>
          <View style={styles.shadowBox}>
            <TextInput
              style={styles.zipCodeEntry}
              keyboardType={'number-pad'}
              onChangeText={zipCode => this.setState({ zipCode })}
              value={this.state.zipCode}
              placeholder={'Enter Zipcode'}
              placeholderTextColor="#8C9EAF"
              onSubmitEditing={() => this.searchMarketData(this.state.zipCode)}
            />
            <Button
              title={'GO'}
              buttonStyle={styles.submitButton}
              titleStyle={styles.submitTitle}
              disabled={this.state.zipCode.length < 5}
              disabledStyle={styles.submitDisabled}
              onPress={() => this.searchMarketData(this.state.zipCode)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>Recommended Basis</Text>
            {this.renderRecommendedBasisResults()}
            <Text style={styles.headerText}>Nearest Basis</Text>
            {this.renderBasisResults()}
          </View>
        </View>
      </SafeAreaView>
    )
  }

  searchMarketData(zipCode: string) {
    this.props.analyticsService.record('SelectBasisScreen.searchMarketData', {
      zipCode,
    })
    this.props.uiStore.searchMarketData(zipCode)
    Keyboard.dismiss()
  }

  renderBasisResults = () => {
    if (this.props.uiStore.loading) {
      return <LoadingView />
    }

    if (this.props.uiStore.hasSearched && this.props.uiStore.locationResultsForSearch.length < 1) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results for this search, we recommend</Text>
          <Text style={styles.noResultsTextSecondLine}>
            going with the <Text style={styles.strong}>Chicago Board of Trade</Text>
          </Text>
          {this.renderItem()}
        </View>
      )
    }

    return (
      <FlatList
        data={[...this.props.uiStore.locationResultsForSearch, undefined]}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => this.renderItem(item)}
        onScroll={() => Keyboard.dismiss()}
        ItemSeparatorComponent={() => (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: 1, width: 20, backgroundColor: '#FCFAF3' }} />
            <View style={styles.seperator} />
          </View>
        )}
        ListHeaderComponent={() => <View style={styles.listBorder} />}
        ListFooterComponent={() => <View style={styles.listBorder} />}
      />
    )
  }

  renderRecommendedBasisResults = () => {
    return (
      <FlatList
        style={{ minHeight: 52, flexGrow: 0 }}
        data={[undefined]}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={() => this.renderCBOT()}
        ListHeaderComponent={() => <View style={styles.listBorder} />}
        ListFooterComponent={() => <View style={styles.listBorder} />}
      />
    )
  }

  selectLocationResult = (grainBidResult?: GrainBidsResult) => {
    this.props.analyticsService.record('SelectBasisScreen.selectLocationResult', {
      distance: grainBidResult ? grainBidResult.distance : undefined,
      company: grainBidResult ? grainBidResult.company : undefined,
      locationId: grainBidResult ? `${grainBidResult.locationId}` : undefined,
      city: grainBidResult ? grainBidResult.city : undefined,
      state: grainBidResult ? grainBidResult.state : undefined,
    })
    this.props.uiStore.selectGrainBidResultForAdding(grainBidResult)
    this.props.navigation.navigate(AddingCropScreenNames.SelectActiveMonth)
  }

  renderItem(item?: GrainBidsResult) {
    if (!item) {
      if (!this.props.uiStore.hasSearched) {
        return <View />
      }

      return (
        <BasisLocationMissingButton onPress={this.showEmailForm}>
          <BasisLocationMissingText>Basis Location Missing?</BasisLocationMissingText>
        </BasisLocationMissingButton>
      )
    }

    return (
      <TouchableHighlight style={styles.itemButton} onPress={() => this.selectLocationResult(item)}>
        <View style={styles.itemBox}>
          <Text style={styles.itemText}>{`${item.city} - ${item.company}`}</Text>
          {item.distance !== undefined && <Text style={styles.distanceText}>{item.distance}</Text>}
        </View>
      </TouchableHighlight>
    )
  }

  renderCBOT() {
    return (
      <TouchableHighlight style={styles.itemButton} onPress={() => this.selectLocationResult()}>
        <View style={styles.itemBox}>
          <Text style={styles.itemText}>Chicago Board of Trade (CBOT)</Text>
        </View>
      </TouchableHighlight>
    )
  }

  showEmailForm = () => {
    Linking.openURL(
      'mailto:info@croptomize.com?subject=Basis location missing&body=Data seems to be missing for: ',
    ).catch(ex => console.log(ex))
  }
}

const BasisLocationMissingButton = styled.TouchableOpacity`
  border: 2px;
  color: ${AppColors.navy};
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  width: 168px;
  align-self: center;
  margin-top: 30px;
  margin-bottom: 30px;
`

const BasisLocationMissingText = styled.Text`
  color: ${AppColors.navy};
  font-size: 11px;
  font-family: ${AppFonts.semiBold};
`

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#E8E5DC',
    alignSelf: 'flex-end',
    width: 355,
  },
  itemBox: {
    backgroundColor: '#FCFAF3',
    height: 50,
    justifyContent: 'center',
  },
  itemButton: {
    alignSelf: 'stretch',
  },
  itemText: {
    color: '#1A3E61',
    marginLeft: 19,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  distanceText: {
    color: '#1A3E61',
    marginLeft: 19,
    marginTop: 5,
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
  },
  headerText: {
    color: '#8C9EAF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    marginLeft: 17,
    marginBottom: 7,
    marginTop: 17,
  },
  listBorder: {
    height: 1,
    backgroundColor: '#E8E5DC',
  },
  backButton: {
    tintColor: '#1A3E61',
    height: 16,
    width: 10,
    marginLeft: 22,
    marginTop: 35,
  },
  shadowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 4, width: 0 }, // IOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#FCFAF3',
  },
  noResultsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  noResultsText: {
    fontSize: 13,
  },
  noResultsTextSecondLine: {
    fontSize: 13,
    marginBottom: 14,
  },
  zipCodeEntry: {
    flexGrow: 1,
    height: 48,
    paddingLeft: 15,
    marginTop: 22,
    marginBottom: 17,
    marginLeft: 24,
    marginRight: 10,
    borderColor: '#E8E5DC',
    borderWidth: 1,
    backgroundColor: '#F2F2E6',
    borderRadius: 10,
  },
  submitButton: {
    height: 48,
    width: 58,
    backgroundColor: '#86D0CA',
    borderRadius: 8,
    marginRight: 24,
  },
  submitTitle: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    color: '#1A3E61',
  },
  submitDisabled: {
    backgroundColor: '#ACD0CD',
  },
  strong: {
    fontWeight: 'bold',
  },
})
