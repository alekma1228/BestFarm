import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import AddCropBackground from '../components/AddCropBackground'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { CATEGORIES, DashboardStore } from '../../stores/DashboardStore'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { HeaderStore } from '../../stores/HeaderStore'
import Input from './AddCropInput'
import { ModalPopup } from '../components/ModalPopup'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { AppNavigationSectionNames } from '../navigation/AppNavigationSectionNames'

const SCREEN_WIDTH = Dimensions.get('window').width
const TITLE = 'Crop Expenses Per Acre'
const SUBTITLE = 'Enter in your total farm expenses for this crop per acre. These can be changed later'
const C_TITLE = 'Expense Categories'
const B_TITLE = 'Confirm Expenses'

type Params = { crop: Commodity; categories: string[]; newYear?: { name: string; year: number } }
type Props = { headerStore: HeaderStore; dashboardStore: DashboardStore } & NavigationScreenProps<Params>
const CropExpensesScreen: React.FC<Props> = observer(props => {
  const { headerStore, navigation, dashboardStore } = props
  const { routeName, params } = navigation.state
  const { inputs, setInput } = useExpenses()
  const [visible, setVisible] = useState(false)

  const onPress = useCallback(() => {
    const { crop, categories, newYear } = params as Params
    if (newYear) {
      dashboardStore.addYear(newYear.name, newYear.year)
      dashboardStore.modal.isNewYear = true
      dashboardStore.modal.show = true
    }

    dashboardStore.selectedDashboard.addCrop(crop, inputs.map(Number), categories.map(Number))
    setVisible(true)
  }, inputs)
  const toDashboard = useCallback(() => {
    setVisible(false)
    navigation.popToTop()
    // show New Year Started
    setTimeout(dashboardStore.modal.fn, 750)
  }, [])
  const addAnother = useCallback(() => {
    setVisible(false)
    navigation.reset(
      [
        NavigationActions.navigate({
          routeName: AppNavigationSectionNames.MainApp,
          action: NavigationActions.navigate({ routeName: DashboardScreenNames.Tabs }),
        }),
        NavigationActions.navigate({ routeName: DashboardScreenNames.Settings }),
        NavigationActions.navigate({ routeName: DashboardScreenNames.AddCrop }),
      ],
      2,
    )
  }, [])

  headerStore.setIcon(routeName, {}, (params as Params).crop.symbolPrefix)

  return (
    <AddCropBackground title={TITLE} subtitle={SUBTITLE} cardTitle={C_TITLE} buttonTitle={B_TITLE} onPress={onPress}>
      {Object.values(CATEGORIES).map((cat, i) => (
        <Input prefix="$" key={cat.key} text={cat.title} onChangeText={setInput(i)} value={inputs[i]} />
      ))}
      <ModalPopup
        visible={visible}
        title="Crop Added!"
        buttonText="Continue To Dashboard"
        onButtonPress={toDashboard}
        onDismiss={() => setVisible(false)}
      >
        <TouchableOpacity style={styles.button} onPress={addAnother}>
          <Text style={styles.text}>Add Another Crop</Text>
        </TouchableOpacity>
      </ModalPopup>
    </AddCropBackground>
  )
})

const useExpenses = () => {
  // order is preserved
  const [inputs, setInputs] = useState(Array(Object.keys(CATEGORIES).length).fill('0'))
  // magic
  const setInput = (i: number) => (v: string) => setInputs(Object.assign([...inputs], { [i]: v }))

  return { inputs, setInput }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 5,
    borderColor: AppColors.navy,
    top: -20,
    paddingTop: 10,
    paddingBottom: 10,
    width: SCREEN_WIDTH * 0.7,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    color: AppColors.navy,
    fontFamily: AppFonts.button,
    textAlign: 'center',
  },
})

const mapStoreToProps = ({ headerStore, dashboardStore }: RootStore) => ({
  headerStore,
  dashboardStore,
})

export default withStoreContext(CropExpensesScreen, mapStoreToProps)
