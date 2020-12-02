import React, { useCallback, useState, useMemo } from 'react'
import { View, Text, TextInput, Picker, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { RootStore } from '../../stores/RootStore'
import { DashboardStore } from '../../stores/DashboardStore'
import { HeaderStore } from '../../stores/HeaderStore'
import { withStoreContext } from '../../stores/StoreContext'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { AppColors, AppFonts } from '../styles/AppStyles'
import AddCropBackground from '../components/AddCropBackground'
import { SwipeableModal } from '../components/SwipeableModal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { YellowButton } from '../components/YellowButton'

const TITLE = 'Start New Crop Year'
const SUBTITLE = 'Enter in the name & select the year for your new crop year.'
const C_TITLE = 'Crop Year Infromation'

type Props = { dashboardStore: DashboardStore; headerStore: HeaderStore } & NavigationScreenProps
const AddYearScreen: React.FC<Props> = props => {
  const activeYear = props.dashboardStore.selectedDashboard.year
  const [year, setYear] = useState(activeYear + 1)
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const { headerStore, navigation } = props
  const years = useMemo(
    () =>
      Array.from(Array(20).keys())
        .map(y => (y < 10 ? activeYear - y : activeYear + y - 9))
        .sort(),
    [],
  )
  const dismiss = useCallback(() => setVisible(false), [])
  headerStore.leftButton[DashboardScreenNames.AddYear] = () => {
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
  const toImport = useCallback(() => navigation.navigate(DashboardScreenNames.DataImport, { name, year }), [name, year])
  return (
    <AddCropBackground title={TITLE} subtitle={SUBTITLE} cardTitle={C_TITLE} buttonTitle="Continue" onPress={toImport}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput style={styles.input} placeholder="Crop Year Name" value={name} onChangeText={setName} />
        </View>
        <TouchableOpacity style={button.touchable} onPress={() => setVisible(true)}>
          <Icon name="calendar-month" size={24} color={AppColors.lightTextColor} />
          <Text style={button.text}>{year}</Text>
          <Icon name="chevron-down" size={28} color={AppColors.lightTextColor} />
        </TouchableOpacity>
      </View>
      <SwipeableModal visible={visible} onDismiss={dismiss}>
        <View style={modal.empty} />
        <View style={modal.container}>
          <Text style={modal.title}>Select Crop Year</Text>
          <View style={modal.pickerView}>
            <Picker selectedValue={year} onValueChange={val => setYear(Number(val))}>
              {years.map(y => (
                <Picker.Item key={y} color={AppColors.navy} label={String(y)} value={y} />
              ))}
            </Picker>
          </View>
          <YellowButton onPress={dismiss} text="Confirm Year" />
        </View>
      </SwipeableModal>
    </AddCropBackground>
  )
}

const modal = StyleSheet.create({
  container: {
    bottom: 0,
    backgroundColor: AppColors.navy,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  empty: {
    flex: 1,
  },
  pickerView: {
    borderRadius: 5,
    backgroundColor: AppColors.backgroundCream,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    color: AppColors.lightTextColor,
    fontFamily: AppFonts.medium,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
  },
})
const button = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: AppColors.navy,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    paddingLeft: 10,
    fontFamily: AppFonts.bold,
    color: AppColors.lightTextColor,
    flex: 1,
  },
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // AddCropBackground has paddingLeft: 20
    marginLeft: -10,
    paddingRight: 10,
    paddingTop: 10,
  },
  inputView: {
    flex: 1,
    height: 50,
    backgroundColor: AppColors.darkCream,
    borderRadius: 10,
    borderColor: AppColors.thinLine,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    fontFamily: AppFonts.regular,
    color: AppColors.lightNavy,
  },
})

const mapStoreToProps = ({ headerStore, dashboardStore }: RootStore) => ({
  headerStore,
  dashboardStore,
})

export default withStoreContext(AddYearScreen, mapStoreToProps)
