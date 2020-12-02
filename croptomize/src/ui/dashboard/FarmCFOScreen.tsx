import React, { useState, useCallback } from 'react'
import { Animated } from 'react-native'
import { observer } from 'mobx-react-lite'
import { formatToCurrency } from '../../utilities/currency'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { NavigationScreenProps } from 'react-navigation'
import { AppColors } from '../styles/AppStyles'
import CategoryCard from './CategoryCard'
import { SwipeableModal } from '../components/SwipeableModal'
import { RoundedTopView } from '../components/RoundedTopView'
import { UIStore } from '../../stores/UIStore'
import { DashboardStore, CategoryEnum } from '../../stores/DashboardStore'
import { FarmPieChart } from './FarmPieChart'
import farmCFOStyles from './FarmCFOStyles'
import ContractCard from './ContractCard'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { useNavigation } from 'react-navigation-hooks'

type Props = { uiStore: UIStore; dashboardStore: DashboardStore } & NavigationScreenProps
const FarmCFOScreen: React.FC<Props> = observer(props => {
  const rootNavigation = (useNavigation() as any).getScreenProps().rootNavigation

  const {
    visible,
    setVisible,
    dismiss,
    selectedCat,
    onPress,
    onPressProjectedRevenue,
    onPressProjectedExpenses,
  } = useModal(props, rootNavigation)
  const { selectedDashboard } = props.dashboardStore

  const onCropSelect = useCallback(
    (symbolPrefix, isExpense) => {
      if (isExpense) {
        rootNavigation.navigate(DashboardScreenNames.EditCropExpenses, { key: symbolPrefix })
      } else {
        rootNavigation.navigate(DashboardScreenNames.EditCropRevenue, { key: symbolPrefix })
      }

      setVisible(false)
    },
    [selectedCat.key],
  )

  const categories: { amount: number; title: string; color: string; key: CategoryEnum }[] = []
  Object.values(selectedDashboard.categories).map(({ key, ...rest }) => {
    categories.push({
      key,
      ...rest,
    })
  })
  categories.forEach(category => {
    category.amount = 0
    Object.keys(selectedDashboard.crops).forEach(key => {
      const crop = selectedDashboard.crops[key]
      category.amount = category.amount + crop.numOfAcres * crop[category.key]
    })
  })

  return (
    <Scroll as={Animated.ScrollView} style={{ backgroundColor: props.uiStore.interpolatedColors } as any}>
      <BottomView>
        <Head>
          <Title>{selectedDashboard.year} Farm Financials</Title>
          <Sub>Edit crop specific expenses & revenue to update these totals</Sub>
        </Head>
        <Row>
          <CategoryCard
            catKey={CategoryEnum.Land}
            title="Projected Revenue"
            amount={selectedDashboard.yearRevenue}
            color={AppColors.info}
            flex={1}
            onPress={onPressProjectedRevenue}
          />
          <MiddleSpace />
          <CategoryCard
            catKey={CategoryEnum.Land}
            title="Projected Expenses"
            amount={selectedDashboard.yearExpenses}
            color={AppColors.lightRed}
            flex={1}
            onPress={onPressProjectedExpenses}
          />
        </Row>
        <Row>
          <Profits>
            <ProfitText>Total Farm Profits</ProfitText>
            <ProfitAmount>${formatToCurrency(selectedDashboard.profit, 0)}</ProfitAmount>
          </Profits>
        </Row>
        <Head>
          <Title>{selectedDashboard.year} Farm Contracts</Title>
          <Sub>Contracted & remaining bushels combined from all crops</Sub>
        </Head>
        {Object.values(selectedDashboard.crops).map(crop => (
          <ContractCard key={crop.symbolPrefix} crop={crop} />
        ))}
        <FarmPieChart categories={Object.values(selectedDashboard.categories)} total={selectedDashboard.yearExpenses} />
        <Head>
          <Title>{selectedDashboard.year} Farm Expense Categories</Title>
          <Sub>Edit crop specific expenses to update these totals</Sub>
        </Head>
        <CategoryContainer>
          {Object.values(categories).map(category => (
            <CategoryCard
              key={category.key}
              catKey={category.key}
              onPress={onPress}
              title={category.title}
              amount={category.amount}
              color={category.color}
            />
          ))}
        </CategoryContainer>
      </BottomView>
      <SwipeableModal visible={visible} onDismiss={dismiss}>
        <RoundedTopView title={selectedCat.title}>
          {Object.values(selectedDashboard.crops).map((c, i) => (
            <Button key={i} onPress={() => onCropSelect(c.symbolPrefix, selectedCat.isExpense)}>
              <ButtonText>{c.displayName}</ButtonText>
            </Button>
          ))}
        </RoundedTopView>
      </SwipeableModal>
    </Scroll>
  )
})
const useModal = (
  props: React.PropsWithChildren<Props>,
  rootNavigation: { navigate: (arg0: DashboardScreenNames, params?: any) => void },
) => {
  const [visible, setVisible] = useState(false)
  const [selectedCat, setSelectedCat] = useState({ title: '', key: CategoryEnum.Land, isExpense: false })
  const dismiss = useCallback(() => setVisible(false), [])
  const { selectedDashboard } = props.dashboardStore

  const onPress = (which: string, key: CategoryEnum) => {
    const crops = Object.values(selectedDashboard.crops)
    if (crops.length > 0) {
      setSelectedCat({ title: `Edit ${which} Total`, key, isExpense: true })
      setVisible(true)
    } else {
      rootNavigation.navigate(DashboardScreenNames.AddCrop)
    }
  }

  const onPressProjectedRevenue = () => {
    const crops = Object.values(selectedDashboard.crops)
    if (crops.length > 0) {
      setSelectedCat({ title: 'Edit projected revenue', key: CategoryEnum.Land, isExpense: false })
      setVisible(true)
    } else {
      rootNavigation.navigate(DashboardScreenNames.AddCrop, { isRevenue: true })
    }
  }

  const onPressProjectedExpenses = () => {
    const crops = Object.values(selectedDashboard.crops)
    if (crops.length > 0) {
      setSelectedCat({ title: 'Edit projected expenses', key: CategoryEnum.Land, isExpense: true })
      setVisible(true)
    } else {
      rootNavigation.navigate(DashboardScreenNames.AddCrop)
    }
  }
  return { visible, setVisible, dismiss, selectedCat, onPress, onPressProjectedRevenue, onPressProjectedExpenses }
}

const {
  Scroll,
  Row,
  Head,
  Sub,
  Title,
  BottomView,
  CategoryContainer,
  Button,
  ButtonText,
  MiddleSpace,
  Profits,
  ProfitText,
  ProfitAmount,
} = farmCFOStyles
const mapStoreToProps = ({ uiStore, dashboardStore }: RootStore) => ({ uiStore, dashboardStore })
export default withStoreContext(FarmCFOScreen, mapStoreToProps)
