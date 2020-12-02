import React from 'react'
import WebView from 'react-native-webview'
import { UIStore } from '../../stores/UIStore'
import { View } from 'react-native'

export interface NewsWebComponentProps {
  uiStore: UIStore
}

export const NewsWebScreen = (props: NewsWebComponentProps) => {
  if (!props.uiStore.selectedBlogPost) {
    return <View />
  }

  return <WebView source={{ uri: props.uiStore.selectedBlogPost.link }} />
}
