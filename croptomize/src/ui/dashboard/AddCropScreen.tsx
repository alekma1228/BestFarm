import React, { useState, useCallback } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import AddCropBackground from '../components/AddCropBackground'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { UIStore } from '../../stores/UIStore'
import { NavigationScreenProps } from 'react-navigation'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { HeaderStore } from '../../stores/HeaderStore'
import { DashboardStore } from '../../stores/DashboardStore'
import { CATEGORIES, YIELDS } from '../../stores/DashboardStore'

const TITLE = 'Select Crop'
const SUBTITLE_EXPENSES = 'Select the crop you wish to track expenses & production estimates'
const SUBTITLE_REVENUE = 'Select the crop you wish to track revenue'
const C_TITLE = 'Available Crops'

type Props = { uiStore: UIStore; headerStore: HeaderStore; dashboardStore: DashboardStore } & NavigationScreenProps
const AddCropScreen: React.FC<Props> = observer(props => {
  const { headerStore, navigation, dashboardStore } = props
  const params = navigation.state.params as any
  const newYear = (params && params.newYear) || false
  const isRevenue = (params && params.isRevenue) || false
  const { commodities } = props.uiStore
  const dashboard = props.dashboardStore.selectedDashboard
  const { inputsCategory, inputs } = useExpenses()

  const toExpenses = useCallback(
    (crop: Commodity) => {
      if (isRevenue) {
        console.log('Please go Revenue screen')
        dashboardStore.selectedDashboard.addCrop(crop, inputsCategory.map(Number), inputs.map(Number))
        props.navigation.popToTop()
        props.navigation.navigate(DashboardScreenNames.EditCropRevenue, { key: crop.symbolPrefix })
      } else {
        props.navigation.navigate(DashboardScreenNames.CropProdEstimate, { crop, newYear })
      }
    },
    [inputs, inputsCategory],
  )
  headerStore.setIcon(navigation.state.routeName, {
    picture: require('../../../assets/croptomize-logomark.png'),
    backgroundColor: AppColors.navy,
    pictureStyle: {
      width: 40,
      height: 40,
      tintColor: null,
    },
  })

  return (
    <AddCropBackground title={TITLE} subtitle={isRevenue ? SUBTITLE_REVENUE : SUBTITLE_EXPENSES} cardTitle={C_TITLE}>
      {crops(
        commodities.filter(c => (newYear ? true : !dashboard.tabOrder.includes(c.symbolPrefix))),
        toExpenses,
      )}
    </AddCropBackground>
  )
})

const crops = (commodities: Commodity[], onPress: (crop: Commodity) => void) =>
  commodities.map(c => (
    <TouchableOpacity key={c.symbolPrefix} style={itemStyle.button} onPress={() => onPress(c)}>
      <Text style={itemStyle.text}>{c.displayName}</Text>
    </TouchableOpacity>
  ))

const itemStyle = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.thinLine,
  },
  text: {
    color: AppColors.navy,
    fontFamily: AppFonts.semiBold,
    fontSize: 12,
  },
})

const useExpenses = () => {
  // order is preserved
  const [inputsCategory] = useState(Array(Object.keys(CATEGORIES).length).fill('0'))
  const [inputs] = useState(Array(YIELDS.length).fill('0'))

  return { inputsCategory, inputs }
}

const mapStoreToProps = ({ uiStore, headerStore, dashboardStore }: RootStore) => ({
  uiStore,
  headerStore,
  dashboardStore,
})
export default withStoreContext(AddCropScreen, mapStoreToProps)
