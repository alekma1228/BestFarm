import React, { useState, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { UIStore } from '../../stores/UIStore'
import { createMaterialTopTabNavigator, createAppContainer, NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import { AppColors } from '../styles/AppStyles'
import { HeaderStore } from '../../stores/HeaderStore'
import { SwipeableModal } from '../components/SwipeableModal'
import { RoundedTopView } from '../components/RoundedTopView'
import { Text } from 'react-native-elements'
import TabBar from '../components/TabBar'
import { DashboardStore } from '../../stores/DashboardStore'
import { ModalPopup } from '../components/ModalPopup'
import { DashboardScreenNames } from './DashboardScreenNames'
import GetStartedScreen from '../dashboard/GetStartedScreen'
import CFOTutorialScreen from '../dashboard/CFOTutorialScreen'

const { CropProdEstimate, CropExpenses, Tabs, Settings, AddCrop } = DashboardScreenNames

const MODAL_WIDTH = Dimensions.get('window').width * 0.8

type Props = {
  uiStore: UIStore
  headerStore: HeaderStore
  dashboardStore: DashboardStore
} & NavigationScreenConfigProps
const DashboardTabNavigator: React.FC<Props> = observer(props => {
  const { headerStore, uiStore, dashboardStore, navigation } = props
  const dashboard = dashboardStore.selectedDashboard
  const [isStarted, setIsStarted] = useState(false)
  const { visible, dismiss, open } = useCalendar()
  const [modalVisible, setModalVisible] = useState(false)
  const selectYear = useCallback(key => {
    dashboardStore.selectedYear = key
    // allow some time for background to re-render
    setTimeout(dismiss, 500)
  }, [])
  const TabNavigator = useMemo(
    () =>
      createMaterialTopTabNavigator(dashboard.tabs, {
        tabBarComponent: _props => {
          uiStore.setAnimatedColors(_props.position, _props.navigationState.routes)
          return <TabBar {..._props} interpolate={uiStore.interpolatedColors} />
        },
        resetOnBlur: true,
        tabBarOptions: {
          scrollEnabled: true,
          upperCaseLabel: false,
        },
        order: dashboard.tabOrder,
      }),
    [dashboardStore.selectedYear, JSON.stringify(dashboard.tabOrder)],
  )
  headerStore.leftButton[Tabs] = () => {
    open()
  }
  headerStore.rightButton[Tabs] = () => {
    navigation.navigate(Settings)
  }
  headerStore.leftButton[AddCrop] = headerStore.leftButton[CropExpenses] = headerStore.leftButton[
    CropProdEstimate
  ] = () => {
    navigation.pop()
  }
  dashboardStore.modal.fn = () => {
    if (dashboardStore.modal.isNewYear) {
      setModalVisible(true)
    }
  }
  const dismissModal = () => {
    setModalVisible(false)
    dashboardStore.modal.isNewYear = false
  }

  const onGetStarted = () => {
    setIsStarted(true)
  }
  // will crash if it isnt in a container
  const Container = useMemo(() => createAppContainer(TabNavigator), [JSON.stringify(dashboard.tabOrder)])
  if (!isStarted && dashboard.tabOrder.length === 1) {
    return <GetStartedScreen navigation={props.navigation} onGetStarted={onGetStarted} uiStore={uiStore} />
  }

  return (
    <React.Fragment>
      <Container style={{ backgroundColor: 'transparent' }} screenProps={{ rootNavigation: navigation }} />
      <SwipeableModal visible={visible} onDismiss={dismiss}>
        <RoundedTopView title="Year">
          {props.dashboardStore.years.map(y => {
            const selected = y.key === dashboard.key
            const backgroundColor = selected ? AppColors.yellow : AppColors.backgroundCream
            const text = `${y.year} - ${y.name}`
            return (
              <TouchableOpacity
                key={y.key}
                onPress={() => selectYear(y.key)}
                style={{ ...itemStyles.buttonStyle, backgroundColor }}
              >
                <Text numberOfLines={1} style={[itemStyles.buttonTextStyle, { maxWidth: '80%' }]}>
                  {text}
                </Text>
                {selected ? <Text style={itemStyles.buttonTextStyle}>(Active)</Text> : null}
              </TouchableOpacity>
            )
          })}
        </RoundedTopView>
      </SwipeableModal>
      <ModalPopup
        visible={modalVisible}
        title="New Crop Year Started!"
        buttonText="Continue To Dashboard"
        onDismiss={dismissModal}
      >
        <View style={modalStyles.fill} />
      </ModalPopup>

      <CFOTutorialScreen uiStore={uiStore} />
    </React.Fragment>
  )
})
const useCalendar = () => {
  const [visible, setVisible] = useState(false)
  const dismiss = useCallback(() => setVisible(false), [])
  const open = useCallback(() => setVisible(true), [])
  return { visible, dismiss, open }
}

const modalStyles = StyleSheet.create({
  fill: {
    width: MODAL_WIDTH,
  },
})
const itemStyles = StyleSheet.create({
  buttonStyle: {
    minHeight: 50,
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.backgroundCream,
  },
  buttonTextStyle: {
    color: AppColors.navy,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

const mapStoreToProps = ({ uiStore, headerStore, dashboardStore }: RootStore) => ({
  uiStore,
  headerStore,
  dashboardStore,
})
const NavigatorWithContext = withStoreContext(DashboardTabNavigator, mapStoreToProps)

export default NavigatorWithContext
