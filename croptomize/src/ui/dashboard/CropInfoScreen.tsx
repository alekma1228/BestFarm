import React, { useCallback } from 'react'
import { KeyboardAvoidingView, Dimensions, View, StyleSheet, Animated } from 'react-native'
import { observer } from 'mobx-react-lite'
import { withStoreContext } from '../../stores/StoreContext'
import { AppColors } from '../styles/AppStyles'
import { RootStore } from '../../stores/RootStore'
import { UIStore } from '../../stores/UIStore'
import { DashboardStore } from '../../stores/DashboardStore'
import { NavigationScreenProps } from 'react-navigation'
import CropProductionCard from './CropProductionCard'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { CategoryEnum } from '../../stores/DashboardStore'
import CropFinanceCard from './CropFinanceCard'
import CropRevenueCard from './CropRevenueCard'
import CropExpensesCard from './CropExpensesCard'

const SCREEN_HEIGHT = Dimensions.get('window').height

type Params = { focus?: CategoryEnum }
type Props = { uiStore: UIStore; dashboardStore: DashboardStore } & NavigationScreenProps<Params>
const CropInfoScreen: React.FC<Props> = observer(props => {
  const { navigation } = props
  const { key } = navigation.state
  const dashboard = props.dashboardStore.selectedDashboard
  const crop = dashboard.crops[key]
  const toEdit = useCallback(() => {
    const rootNavigation: typeof navigation = (navigation as any).getScreenProps().rootNavigation
    rootNavigation.navigate(DashboardScreenNames.EditCropProdEstimate, { key, displayName: crop.displayName })
  }, [])

  return (
    <KeyboardAvoidingView
      style={keyboardStyle}
      behavior="position"
      contentContainerStyle={keyboardStyle}
      keyboardVerticalOffset={75}
      enabled
    >
      <Animated.ScrollView style={{ ...containerStyle, backgroundColor: props.uiStore.interpolatedColors }}>
        <View style={emptyStyle} />
        <View style={bottomViewStyle}>
          <CropProductionCard
            crop={crop}
            numOfAcres={crop.numOfAcres}
            minimalYield={crop.minimalYield}
            maximumYield={crop.maximumYield}
            expectedYield={crop.expectedYield}
            year={dashboard.year}
            onPress={toEdit}
          />
          <View style={belowCardStyle}>
            <CropFinanceCard
              year={dashboard.year}
              name={crop.displayName}
              amounts={[crop.totalProfit, crop.totalRevenue, crop.totalExpensesCost]}
            />
            <CropRevenueCard crop={crop} />
            <CropExpensesCard crop={crop} />
          </View>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  )
})
const { containerStyle, keyboardStyle, belowCardStyle, bottomViewStyle, emptyStyle } = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  keyboardStyle: {
    flex: 1,
  },
  emptyStyle: {
    height: SCREEN_HEIGHT * 0.2,
  },
  bottomViewStyle: {
    backgroundColor: AppColors.darkCream,
    zIndex: 0,
    flex: 1,
    paddingTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  belowCardStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 24,
    marginBottom: 40,
  },
})
const mapStoreToProps = ({ uiStore, dashboardStore }: RootStore) => ({
  uiStore,
  dashboardStore,
})
export default withStoreContext(CropInfoScreen, mapStoreToProps)
