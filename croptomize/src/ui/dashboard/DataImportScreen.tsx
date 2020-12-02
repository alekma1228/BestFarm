import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { RootStore } from '../../stores/RootStore'
import { DashboardStore } from '../../stores/DashboardStore'
import { HeaderStore } from '../../stores/HeaderStore'
import { withStoreContext } from '../../stores/StoreContext'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import AddCropBackground from '../components/AddCropBackground'
import { AppColors, AppFonts } from '../styles/AppStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { YellowButton } from '../components/YellowButton'

const TITLE = 'New Crop Data'
const SUBTITLE = 'Select data to copy over from previous crop years or start from scratch'
const C_TITLE = 'Select Data to copy over'

type Props = { dashboardStore: DashboardStore; headerStore: HeaderStore } & NavigationScreenProps
const DataImportScreen: React.FC<Props> = props => {
  const { headerStore, navigation, dashboardStore } = props
  const crops = Object.values(dashboardStore.selectedDashboard.crops)
  const { marked, setMark } = useBox(crops.length)
  const { name = '', year } = navigation.state.params as { name?: string; year: number }
  headerStore.leftButton[DashboardScreenNames.DataImport] = () => {
    props.navigation.goBack()
  }
  headerStore.setIcon(navigation.state.routeName, {
    picture: require('../../../assets/croptomize-logomark.png'),
    backgroundColor: AppColors.navy,
    pictureStyle: {
      width: 40,
      height: 40,
      tintColor: null,
    },
  })
  const onImport = () => {
    const selected = crops.map(c => c.symbolPrefix).filter((_, i) => marked[i])
    dashboardStore.addYear(name, year, selected)
    navigation.popToTop()
    dashboardStore.modal.show = true
    dashboardStore.modal.isNewYear = true
    // show New Year Started
    setTimeout(dashboardStore.modal.fn, 750)
  }
  const onNew = () => {
    navigation.navigate(DashboardScreenNames.AddCrop, { newYear: { name, year } })
  }
  return (
    <View style={styles.container}>
      <AddCropBackground title={TITLE} subtitle={SUBTITLE} cardTitle={C_TITLE}>
        <View style={styles.container}>
          {crops.map((crop, i) => (
            <TouchableOpacity key={crop.symbolPrefix} style={button.container} onPress={setMark(i)}>
              <Icon
                name={marked[i] ? 'check-circle' : 'checkbox-blank-circle-outline'}
                color={marked[i] ? AppColors.appTealLight : AppColors.navy}
                size={24}
              />
              <Text style={button.text}>{crop.displayName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </AddCropBackground>
      <View style={styles.buttons}>
        <YellowButton text="Copy Over From Previous Year" onPress={onImport} />
        <YellowButton outline text="Start from Scratch" onPress={onNew} />
      </View>
    </View>
  )
}

const useBox = (size: number) => {
  // order is preserved
  const [marked, setMarked] = useState(Array(size).fill(true))
  // magic
  const setMark = (i: number) => () => setMarked(Object.assign([...marked], { [i]: !marked[i] }))

  return { marked, setMark }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    backgroundColor: AppColors.backgroundCream,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
})
const button = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.thinLine,
  },
  text: {
    fontFamily: AppFonts.semiBold,
    color: AppColors.navy,
    marginLeft: 10,
  },
})

const mapStoreToProps = ({ headerStore, dashboardStore }: RootStore) => ({
  headerStore,
  dashboardStore,
})

export default withStoreContext(DataImportScreen, mapStoreToProps)
