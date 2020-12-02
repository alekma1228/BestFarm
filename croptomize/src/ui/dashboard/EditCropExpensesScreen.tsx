import React, { useState } from 'react'
import styles from './EditCropRevenueStyles'
import { withStoreContext } from '../../stores/StoreContext'
import { NavigationScreenProps } from 'react-navigation'
import { RootStore } from '../../stores/RootStore'
import { DashboardStore, CATEGORIES } from '../../stores/DashboardStore'
import { HeaderStore } from '../../stores/HeaderStore'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { YellowButton } from '../components/YellowButton'
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'
import cropInfoStyles from './CropInfoStyles'

const VALUES = Object.values(CATEGORIES)
type Props = { dashboardStore: DashboardStore; headerStore: HeaderStore } & NavigationScreenProps<{ key: string }>
const EditCropExpensesScreen: React.FC<Props> = props => {
  const key = useNavigationParam('key')
  const dashboard = props.dashboardStore.selectedDashboard
  const { goBack } = useNavigation()
  const { inputs, setInput } = useExpenses(dashboard.crops[key].categoryExpenses.map(v => (v === 0 ? '' : String(v))))
  const header = props.headerStore
  header.leftButton[DashboardScreenNames.EditCropExpenses] = () => {
    goBack()
  }
  const onPress = () => {
    dashboard.crops[key].setExpenses(inputs)
    goBack()
  }
  return (
    <AvoidingView>
      <Dismiss>
        <Container>
          {VALUES.map((cat, i) => (
            <Item key={cat.key} bWidth={i === VALUES.length - 1 ? 0 : 1}>
              <Label>{cat.title}</Label>
              <InputView>
                <Input placeholder="$" keyboardType="numeric" value={inputs[i]} onChangeText={setInput(i)} />
              </InputView>
            </Item>
          ))}
        </Container>
      </Dismiss>
      <Empty />
      <Margin>
        <YellowButton text="Update Expenses" onPress={onPress} />
      </Margin>
    </AvoidingView>
  )
}
const useExpenses = (expenses: string[]) => {
  // order is preserved
  const [inputs, setInputs] = useState(expenses)
  // magic
  const setInput = (i: number) => (v: string) => setInputs(Object.assign([...inputs], { [i]: v }))

  return { inputs, setInput }
}

const { Container, Item, Input, Label, InputView, Empty, Margin, Dismiss } = styles
const { AvoidingView } = cropInfoStyles
const mapStoreToProps = ({ headerStore, dashboardStore }: RootStore) => ({
  headerStore,
  dashboardStore,
})
export default withStoreContext(EditCropExpensesScreen, mapStoreToProps)
