import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { withStoreContext } from '../../stores/StoreContext'
import { observer } from 'mobx-react-lite'
import { AppColors, AppFonts } from '../styles/AppStyles'
import DraggableFlatList, { RenderItemInfo, OnMoveEndInfo } from 'react-native-draggable-flatlist'
import { RootStore } from '../../stores/RootStore'
import { DashboardStore, CropStore } from '../../stores/DashboardStore'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderStore } from '../../stores/HeaderStore'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { NavigationScreenProps } from 'react-navigation'

const HEIGHT = 60

type OnMoveEnd = (info: OnMoveEndInfo<string>) => void
type Props = { dashboardStore: DashboardStore; headerStore: HeaderStore } & NavigationScreenProps
const CFOSettingsScreen: React.FC<Props> = observer(props => {
  const dashboard = props.dashboardStore.selectedDashboard
  const header = props.headerStore
  const { crops } = dashboard
  const [data, setData] = useState([...dashboard.tabOrder])
  const { containerStyle, infoTextStyle, actionButtonStyle, actionButtonTextStyle, endTextStyle } = styles
  const areEqual = useWhenImport(data, props.dashboardStore, setData)
  const maxHeight = useMemo(() => (HEIGHT + 1) * data.length, [data.length])
  const onMoveEnd: OnMoveEnd = info => setData(info.data as string[])
  header.leftButton[DashboardScreenNames.Settings] = () => {
    props.navigation.goBack()
  }
  header.rightButton[DashboardScreenNames.Settings] = () => {
    dashboard.tabOrder.replace(data)
    props.navigation.goBack()
  }
  const addYear = useCallback(() => props.navigation.navigate(DashboardScreenNames.AddYear), [])
  const addCrop = useCallback(() => props.navigation.navigate(DashboardScreenNames.AddCrop), [])
  return (
    <View style={containerStyle}>
      <TouchableOpacity style={actionButtonStyle} onPress={addCrop}>
        <Text style={actionButtonTextStyle}>Add Crop</Text>
      </TouchableOpacity>
      <Text style={infoTextStyle}>Manage Dashboard Order</Text>
      <View style={{ ...dragStyle.container, maxHeight }}>
        {areEqual ? (
          <DraggableFlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem(crops)}
            onMoveEnd={onMoveEnd}
          />
        ) : null}
      </View>
      <Text style={infoTextStyle}>Help</Text>
      <TouchableOpacity style={dragStyle.button}>
        <View style={dragStyle.borderView}>
          <Text style={dragStyle.text}>FAQ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={actionButtonStyle} onPress={addYear}>
        <Text style={actionButtonTextStyle}>Start New Crop Year</Text>
      </TouchableOpacity>
      <Text style={endTextStyle}>
        Starting a new crop year will archive the previous year and make the new year the default year.
      </Text>
    </View>
  )
})

const useWhenImport = (data: string[], { selectedDashboard }: DashboardStore, setData: any) => {
  const areEqual = useMemo(
    () =>
      selectedDashboard.tabOrder
        .slice()
        .sort()
        .join('') ===
      data
        .slice()
        .sort()
        .join(''),
    [selectedDashboard.tabOrder.join('')],
  )
  useEffect(() => {
    setData([...selectedDashboard.tabOrder])
  }, [selectedDashboard.tabOrder.join('-')])
  return areEqual
}

const keyExtractor = (item: string) => item
type RenderItem = (crops: { [key: string]: CropStore }) => (info: RenderItemInfo<string>) => any
const renderItem: RenderItem = crops => ({ item, move, moveEnd }) => {
  const displayName = item === 'farm' ? 'Farm' : crops[item].displayName
  return (
    <TouchableOpacity style={dragStyle.button} onLongPress={move} onPressOut={moveEnd}>
      <View style={dragStyle.borderView}>
        <Text style={dragStyle.text}>{displayName}</Text>
        <Icon style={dragStyle.icon} name="menu" size={28} color={AppColors.navy} />
      </View>
    </TouchableOpacity>
  )
}

const dragStyle = StyleSheet.create({
  container: {
    borderColor: AppColors.thinLine,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },
  button: {
    flex: 1,
    height: HEIGHT,
    maxHeight: HEIGHT,
    justifyContent: 'center',
    backgroundColor: AppColors.lightCream,
  },
  borderView: {
    flex: 1,
    marginLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderColor: AppColors.thinLine,
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
  },
  text: {
    flex: 1,
    alignSelf: 'center',
    color: AppColors.navy,
    fontFamily: AppFonts.button,
    fontWeight: '500',
  },
})
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: AppColors.darkCream,
  },
  actionButtonStyle: {
    flex: 1,
    maxHeight: HEIGHT,
    marginTop: 20,
    borderColor: AppColors.thinLine,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: AppColors.lightCream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonTextStyle: {
    color: AppColors.appTealLight,
    fontFamily: AppFonts.button,
    fontSize: 16,
  },
  infoTextStyle: {
    color: AppColors.textInputColor,
    fontFamily: AppFonts.subheading,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 5,
  },
  endTextStyle: {
    color: AppColors.veryLightGrey,
    fontFamily: AppFonts.medium,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
})

const mapStoreToProps = ({ headerStore, dashboardStore }: RootStore) => ({
  headerStore,
  dashboardStore,
})

export default withStoreContext(CFOSettingsScreen, mapStoreToProps)
