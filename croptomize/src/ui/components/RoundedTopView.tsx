//  Created by Modern Logic on 2019-07-16
//  Copyright © 2019 Croptomize. All rights reserved.

import React, { Children, FC } from 'react'
import { Text, ScrollView, Dimensions, View, StyleSheet } from 'react-native'
import { AppFonts } from '../styles/AppStyles'

const SCREEN_HEIGHT = Dimensions.get('window').height
const ITEM_HEIGHT = 60

type Props = { title: string }
export const RoundedTopView: FC<Props> = React.memo(props => {
  const { title, children } = props
  const count = Children.count(children)
  const minHeight = count * ITEM_HEIGHT
  const overflow = SCREEN_HEIGHT - minHeight <= SCREEN_HEIGHT / 2
  return (
    <View style={styles.container}>
      <View style={styles.roundedSection}>
        <Text style={styles.title}>{title}</Text>
        {overflow ? (
          <ScrollView style={[styles.chidrenView, { minHeight }]}>{children}</ScrollView>
        ) : (
          <View style={[styles.chidrenView, { minHeight }]}>{children}</View>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignContent: 'center',
  },
  roundedSection: {
    flex: 1,
    backgroundColor: '#1A3E61',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 40,
  },
  chidrenView: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  title: {
    color: 'white',
    fontFamily: AppFonts.subheading,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
})
