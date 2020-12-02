//
//  SelectCropScreen.tsx
//  Croptomize
//
//  Created by Modern Logic on 2019-08-30
//  Copyright © 2019 Connect the Grey. All Rights Reserved.

import React from 'react'
import { StyleSheet, View, FlatList, Text, TouchableHighlight } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { SelectCropProps } from './SelectCropProps'
import { AddingCropScreenNames } from '../navigation/AddingCropScreenNames'
import { observer } from 'mobx-react'
import { AppColors } from '../styles/AppStyles'

@observer
export class SelectCropScreen extends React.Component<SelectCropProps> {
  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#F2F2E6', justifyContent: 'center' }}>
          <Text style={styles.headerText}>Available Crops</Text>
          <FlatList
            style={{ flexGrow: 0 }}
            data={this.props.uiStore.commodities}
            keyExtractor={item => item.symbolPrefix}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this.selectCrop(item)}>
                <View style={styles.itemBox}>
                  <Text style={styles.itemText}>{item.displayName}</Text>
                </View>
              </TouchableHighlight>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ height: 1, width: 20, backgroundColor: '#FCFAF3' }} />
                <View style={styles.seperator} />
              </View>
            )}
            ListHeaderComponent={() => <View style={styles.listBorder} />}
            ListFooterComponent={() => <View style={styles.listBorder} />}
          />
          <View style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    )
  }

  selectCrop = (commodity: Commodity) => {
    this.props.analyticsService.record('SelectCropScreen.selectCrop', {
      displayName: commodity.displayName,
      symbolPrefix: commodity.symbolPrefix,
    })
    this.props.uiStore.selectCommodityForAdding(commodity)
    this.props.navigation.navigate(AddingCropScreenNames.SelectBasis)
  }
}

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#E8E5DC',
    alignSelf: 'flex-end',
    width: 355,
  },
  itemBox: {
    backgroundColor: AppColors.backgroundCream,
    height: 50,
    justifyContent: 'center',
  },
  itemText: {
    color: AppColors.navy,
    marginLeft: 19,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  headerText: {
    color: AppColors.lightGreyText,
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
})
