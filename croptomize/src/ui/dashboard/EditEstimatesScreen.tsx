import React, { useState } from 'react'
import { View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { withStoreContext } from '../../stores/StoreContext'
import { NavigationScreenProps } from 'react-navigation'
import { RootStore } from '../../stores/RootStore'
import { DashboardStore } from '../../stores/DashboardStore'
import { HeaderStore } from '../../stores/HeaderStore'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { YIELDS } from '../../stores/DashboardStore'
import { useNavigationParam } from 'react-navigation-hooks'
import cropInfoStyles from './CropInfoStyles'

const PLACEHOLDERS = ['Ex. 1,000 Acres', 'Ex. 100 bu/ac', 'Ex. 150 bu/ac', 'Ex. 200 bu/ac']

type Props = { dashboardStore: DashboardStore; headerStore: HeaderStore } & NavigationScreenProps<{ key: string }>
const EditEstimatesScreen: React.FC<Props> = props => {
  const dashboard = props.dashboardStore.selectedDashboard
  const key = useNavigationParam('key')
  const { inputs, setInput } = useEstimates(dashboard.crops[key].values.map(v => (v === 0 ? '' : String(v))))
  const header = props.headerStore
  header.leftButton[DashboardScreenNames.EditCropProdEstimate] = () => {
    props.navigation.goBack()
  }
  const onPress = () => {
    dashboard.crops[key].setEstimates(inputs)
    props.navigation.goBack()
  }
  return (
    <AvoidingView>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.inputs}>
            {YIELDS.map((y, i) => (
              <React.Fragment key={y.key}>
                <Input
                  onChangeText={setInput(i)}
                  value={inputs[i]}
                  label={y.text}
                  placeholder={PLACEHOLDERS[i]}
                  underline={i === 2}
                />
                {i !== YIELDS.length - 1 ? <View style={inputStyle.line} /> : null}
              </React.Fragment>
            ))}
          </View>
          <TouchableOpacity style={button.container} onPress={onPress}>
            <Text style={button.text}>Update Estimates</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </AvoidingView>
  )
}

const useEstimates = (initial: string[]) => {
  // order is preserved
  const [inputs, setInputs] = useState<string[]>(initial)
  // magic
  const setInput = (i: number) => (v: string) => setInputs(Object.assign([...inputs], { [i]: v }))

  return { inputs, setInput }
}

type IProps = {
  onChangeText: (value: string) => void
  value: string
  label: string
  placeholder: string
  underline?: boolean
}
const Input: React.FC<IProps> = ({ onChangeText, value, label, placeholder, underline }) => (
  <>
    <View style={inputStyle.container}>
      <Text
        style={[inputStyle.label, underline ? { textDecorationLine: 'underline', fontFamily: AppFonts.bold } : null]}
      >
        {label}
      </Text>
      <View style={inputStyle.view}>
        <TextInput
          clearTextOnFocus
          keyboardType="numeric"
          style={inputStyle.text}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
    {underline ? (
      <Text style={inputStyle.sub}>
        Expected crop yields production estimates will be used to generate potential total revenues, expenses & profit.
      </Text>
    ) : null}
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundCream,
    paddingTop: 10,
  },
  inputs: {
    flex: 1,
  },
})
const inputStyle = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sub: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: AppFonts.medium,
    fontSize: 11,
    color: AppColors.lightNavy,
  },
  label: {
    fontFamily: AppFonts.semiBold,
    fontSize: 12,
    color: AppColors.navy,
    minWidth: '40%',
    alignSelf: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: AppColors.darkCream,
    borderRadius: 10,
    borderColor: AppColors.thinLine,
    borderWidth: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontFamily: AppFonts.regular,
    color: AppColors.lightNavy,
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: AppColors.thinLine,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
  },
})
const button = StyleSheet.create({
  container: {
    backgroundColor: AppColors.yellow,
    height: 50,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    borderRadius: 30,
    shadowColor: AppColors.navy,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  text: {
    fontFamily: AppFonts.bold,
    color: AppColors.navy,
    textAlign: 'center',
  },
})

const { AvoidingView } = cropInfoStyles
const mapStoreToProps = ({ headerStore, dashboardStore }: RootStore) => ({
  headerStore,
  dashboardStore,
})

export default withStoreContext(EditEstimatesScreen, mapStoreToProps)
