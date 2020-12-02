import React, { useState } from 'react'
import styles from './EditCropRevenueStyles'
import { View, Text, StyleSheet } from 'react-native'
import { AppColors, AppFonts } from '../styles/AppStyles'
import { withStoreContext } from '../../stores/StoreContext'
import { NavigationScreenProps } from 'react-navigation'
import { RootStore } from '../../stores/RootStore'
import { DashboardStore } from '../../stores/DashboardStore'
import { HeaderStore } from '../../stores/HeaderStore'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { YellowButton } from '../components/YellowButton'
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'
import cropInfoStyles from './CropInfoStyles'
import { TeasersView } from '../components/Teasers'
import { UIStore } from 'src/stores/UIStore'

type Props = { dashboardStore: DashboardStore; headerStore: HeaderStore; uiStore: UIStore } & NavigationScreenProps<{
  key: string
}>
const EditCropRevenueScreen: React.FC<Props> = props => {
  const key = useNavigationParam('key')
  const crop = props.dashboardStore.selectedDashboard.crops[key]
  const { goBack } = useNavigation()
  const [contract, setContract] = useState(crop.contractedBushels === 0 ? '' : crop.contractedBushels.toString())
  const [avg, setAvg] = useState(crop.avgSale === 0 ? '' : crop.avgSale.toString())
  const [projectedBasis, setProjectedBasis] = useState(crop.projectedBasis === 0 ? '' : crop.projectedBasis.toString())
  const header = props.headerStore
  const uiStore = props.uiStore
  header.leftButton[DashboardScreenNames.EditCropRevenue] = () => {
    goBack()
  }

  const onPress = () => {
    crop.setRevenue(contract, avg, projectedBasis)
    goBack()
  }
  return (
    <AvoidingView>
      <Dismiss>
        <Container>
          {uiStore.isFreeUser && (
            <TeasersView
              text={
                'What if you could put your grain hedging on auto-steer? Go to the Croptomize website to learn more about our premium features.'
              }
            />
          )}
          <Text style={inputStyle.sub}>Contracted Revenue</Text>
          <View style={inputStyle.line}></View>
          <Item bWidth={1}>
            <Label>Contracted Bushels</Label>
            <InputView>
              <Input placeholder="Ex: 1,000 bu" keyboardType="numeric" value={contract} onChangeText={setContract} />
            </InputView>
          </Item>
          <Item>
            <Label>Average Sale Price</Label>
            <InputView>
              <Input placeholder="Ex: $3.48/bu" keyboardType="numeric" value={avg} onChangeText={setAvg} />
            </InputView>
          </Item>

          <Text style={inputStyle.sub}>Projected Revenue</Text>
          <View style={inputStyle.line}></View>
          <Item>
            <Label>Projected Basis</Label>
            <InputView>
              <Input
                placeholder="Ex: $0.3"
                keyboardType="numeric"
                value={projectedBasis}
                onChangeText={setProjectedBasis}
              />
            </InputView>
          </Item>
        </Container>
      </Dismiss>
      <Empty />
      <Margin>
        <YellowButton text="Update Revenues" onPress={onPress} />
      </Margin>
    </AvoidingView>
  )
}

const { Container, Item, Input, Label, InputView, Empty, Margin, Dismiss } = styles
const { AvoidingView } = cropInfoStyles

const inputStyle = StyleSheet.create({
  sub: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: AppFonts.medium,
    fontSize: 15,
    color: AppColors.lightNavy,
  },
  line: {
    marginLeft: 20,
    marginRight: 20,
    height: 1,
    backgroundColor: AppColors.thinLine,
  },
})

const mapStoreToProps = ({ headerStore, dashboardStore, uiStore }: RootStore) => ({
  headerStore,
  dashboardStore,
  uiStore,
})
export default withStoreContext(EditCropRevenueScreen, mapStoreToProps)
