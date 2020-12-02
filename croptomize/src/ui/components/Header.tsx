import React from 'react'
import SafeAreaView from 'react-native-safe-area-view'
import { Text, StyleSheet, View } from 'react-native'
import { AppColors } from '../styles/AppStyles'
import { NavigationScreenProps } from 'react-navigation'
import { withStoreContext } from '../../stores/StoreContext'
import { RootStore } from '../../stores/RootStore'
import { HeaderStore } from '../../stores/HeaderStore'
import { CropIcon } from './CropIcon'
import { observer } from 'mobx-react'
import { useNavigationParam, useNavigationState } from 'react-navigation-hooks'

type Props = { headerStore: HeaderStore; title?: string; backgroundColor?: string } & NavigationScreenProps
const Header: React.FC<Props> = observer(props => {
  const { crop, removeButtons, key } = useParams()
  const store = props.headerStore
  const count = React.Children.count(props.children)
  const children =
    count === 0
      ? []
      : React.Children.map(props.children, (child, i) =>
          React.cloneElement(child as any, {
            onPress: (data: any) => (i === 0 ? store.onLeftPress(key, data) : store.onRightPress(key, data)),
          }),
        )
  const [left, right] = children
  const { title, backgroundColor = AppColors.lightCream } = props
  const { containerStyle, emptyStyle, titleStyle, titleViewStyle } = styles
  const iconProps = store.titleIcon[key]

  return (
    <SafeAreaView style={{ ...containerStyle, backgroundColor }}>
      {left && !removeButtons ? left : null}
      <View style={emptyStyle} />
      <View style={titleViewStyle}>
        {iconProps ? (
          <CropIcon {...(iconProps as any)} />
        ) : (
          <Text style={titleStyle}>{crop ? `${crop} ${title}` : title}</Text>
        )}
      </View>
      {right && !removeButtons ? right : null}
    </SafeAreaView>
  )
})

const useParams = () => {
  // created on CropInfoScreen
  const crop = useNavigationParam('displayName') as string
  // example in GetStartedScreen
  const removeButtons = !!useNavigationParam('removeButtons') as boolean
  const { routeName } = useNavigationState()

  return { crop, removeButtons, key: routeName }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: AppColors.backgroundCream,
  },
  // aligns buttons
  emptyStyle: {
    flex: 1,
  },
  // centers text
  titleViewStyle: {
    position: 'absolute',
    height: 45,
    justifyContent: 'center',
    bottom: 0,
  },
  titleStyle: {
    fontWeight: '600',
    fontSize: 17,
    color: 'rgba(0,0,0,0.9)',
    textAlign: 'center',
  },
})

const mapStoreToProps = ({ headerStore }: RootStore) => ({ headerStore })
export default withStoreContext(Header, mapStoreToProps)
