import React from 'react'
import { StackNavigatorConfig, createStackNavigator } from 'react-navigation'
import { DashboardScreenNames } from './DashboardScreenNames'
import DashboardTabNav from './DashboardTabNav'
import { IconButton } from '../components/IconButton'
import { AppColors } from '../styles/AppStyles'
import Header from '../components/Header'
import CFOSettingsScreen from '../dashboard/CFOSettingsScreen'
import AddCropScreen from '../dashboard/AddCropScreen'
import CropExpensesScreen from '../dashboard/CropExpensesScreen'
import CropProdEstimateScreen from '../dashboard/CropProdEstimateScreen'
import EditCropProdEstimate from '../dashboard/EditEstimatesScreen'
import AddYearScreen from '../dashboard/AddYearScreen'
import DataImportScreen from '../dashboard/DataImportScreen'
import EditCropRevenueScreen from '../dashboard/EditCropRevenueScreen'
import EditCropExpensesScreen from '../dashboard/EditCropExpensesScreen'

const AddCropHeader = (props: any) => (
  <Header {...props} backgroundColor={AppColors.navy}>
    <IconButton uses="font-awesome" name="chevron-left" size={24} color={AppColors.lightCream} left={15} />
  </Header>
)

export const DashboardScreens = {
  [DashboardScreenNames.Tabs]: {
    screen: DashboardTabNav,
    navigationOptions: {
      header: (props: any) => (
        <Header {...props} title="Farm CFO">
          <IconButton uses="material-community" name="calendar-month" size={32} color={AppColors.navy} left={15} />
          <IconButton uses="material-community" name="menu" size={32} color={AppColors.navy} right={15} />
        </Header>
      ),
    },
  },
}

export const DashOverScreens = {
  [DashboardScreenNames.Settings]: {
    screen: CFOSettingsScreen,
    navigationOptions: {
      header: (props: any) => (
        <Header {...props} title="CFO Settings">
          <IconButton uses="material" name="close" size={32} color={AppColors.navy} left={15} />
          <IconButton uses="Save" name="menu" size={16} color={AppColors.navy} right={15} />
        </Header>
      ),
    },
  },
  [DashboardScreenNames.AddCrop]: {
    screen: AddCropScreen,
    navigationOptions: {
      header: AddCropHeader,
    },
  },
  [DashboardScreenNames.CropExpenses]: {
    screen: CropExpensesScreen,
    navigationOptions: {
      header: AddCropHeader,
    },
  },
  [DashboardScreenNames.CropProdEstimate]: {
    screen: CropProdEstimateScreen,
    navigationOptions: {
      header: AddCropHeader,
    },
  },
  [DashboardScreenNames.EditCropProdEstimate]: {
    screen: EditCropProdEstimate,
    navigationOptions: {
      header: (props: any) => (
        <Header {...props} title="Production Estimates">
          <IconButton uses="material" name="close" size={32} color={AppColors.navy} left={15} />
        </Header>
      ),
    },
  },
  [DashboardScreenNames.EditCropRevenue]: {
    screen: EditCropRevenueScreen,
    navigationOptions: {
      header: (props: any) => (
        <Header {...props} title="Revenue Estimates">
          <IconButton uses="material" name="close" size={32} color={AppColors.navy} left={15} />
        </Header>
      ),
    },
  },
  [DashboardScreenNames.EditCropExpenses]: {
    screen: EditCropExpensesScreen,
    navigationOptions: {
      header: (props: any) => (
        <Header {...props} title="Corn Expenses Per Acre">
          <IconButton uses="material" name="close" size={32} color={AppColors.navy} left={15} />
        </Header>
      ),
    },
  },
  [DashboardScreenNames.AddYear]: {
    screen: AddYearScreen,
    navigationOptions: {
      header: (props: any) => (
        <Header {...props} backgroundColor={AppColors.navy}>
          <IconButton uses="material" name="close" size={32} color={AppColors.lightCream} left={15} />
        </Header>
      ),
    },
  },
  [DashboardScreenNames.DataImport]: {
    screen: DataImportScreen,
    navigationOptions: {
      header: (props: any) => (
        <Header {...props} backgroundColor={AppColors.navy}>
          <IconButton uses="font-awesome" name="chevron-left" size={24} color={AppColors.lightCream} left={15} />
        </Header>
      ),
    },
  },
}

export const DashboardStack = (config: Partial<StackNavigatorConfig> = {}) =>
  createStackNavigator(DashboardScreens, {
    initialRouteName: DashboardScreenNames.Tabs,
    ...config,
  })
