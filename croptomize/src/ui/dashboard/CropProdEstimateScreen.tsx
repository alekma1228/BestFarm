import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { NavigationScreenProps } from 'react-navigation'
import AddCropBackground from '../components/AddCropBackground'
import Input from './AddCropInput'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { HeaderStore } from '../../stores/HeaderStore'
import { YIELDS } from '../../stores/DashboardStore'
import { DashboardScreenNames } from '../navigation/DashboardScreenNames'
import { useNavigation } from 'react-navigation-hooks'

const TITLE = 'Production Estimates'
const SUBTITLE = 'Enter the production estimates for this crop. These can be changed later.'
const C_TITLE = 'Crop Yields'

type Params = { crop: Commodity; newYear: boolean }
type Props = { headerStore: HeaderStore } & NavigationScreenProps<Params>
const CropProdEstimateScreen: React.FC<Props> = observer(props => {
  const { navigate } = useNavigation()
  const { headerStore, navigation } = props
  const { routeName, params } = navigation.state
  const { inputs, setInput } = useEstimates()

  const onPress = useCallback(() => {
    navigate(DashboardScreenNames.CropExpenses, { ...params, categories: inputs })
  }, inputs)

  headerStore.setIcon(routeName, {}, (params as Params).crop.symbolPrefix)

  return (
    <AddCropBackground
      title={TITLE}
      subtitle={SUBTITLE}
      cardTitle={C_TITLE}
      buttonTitle="Confirm Production Estimates"
      onPress={onPress}
    >
      {YIELDS.map((y, i) => (
        <Input
          posfix={i === 0 ? undefined : ' bu/acre'}
          key={y.key}
          text={y.text}
          onChangeText={setInput(i)}
          value={inputs[i]}
        />
      ))}
    </AddCropBackground>
  )
})

const useEstimates = () => {
  // order is preserved
  const [inputs, setInputs] = useState(Array(YIELDS.length).fill('0'))
  // magic
  const setInput = (i: number) => (v: string) => setInputs(Object.assign([...inputs], { [i]: v }))

  return { inputs, setInput }
}

const mapStoreToProps = ({ headerStore }: RootStore) => ({
  headerStore,
})

export default withStoreContext(CropProdEstimateScreen, mapStoreToProps)
