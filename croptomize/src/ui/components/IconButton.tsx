import React from 'react'
import { Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import Material from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'

type Which = 'material' | 'material-community' | 'ionicons' | 'font-awesome' | string
type Props = {
  uses: Which
  name: string
  onPress?: () => void
  color: string
  size: number
  left?: number
  right?: number
}
export const IconButton: React.FC<Props> = props => {
  const { uses, left = 0, right = 0, onPress = () => {}, ..._props } = props
  const Icon = which(uses)

  return (
    <TouchableOpacity style={{ marginLeft: left, marginRight: right }} onPress={onPress}>
      {Icon ? <Icon {..._props} /> : <Text style={{ color: props.color, fontSize: props.size }}>{uses}</Text>}
    </TouchableOpacity>
  )
}

const which = (uses: Which) => {
  switch (uses) {
    case 'material':
      return Material
    case 'material-community':
      return MaterialCommunity
    case 'ionicons':
      return Ionicons
    case 'font-awesome':
      return FontAwesome
    default:
      return false
  }
}
