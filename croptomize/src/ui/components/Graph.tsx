import React from 'react'
import { BasisDatapoint } from '../../model/Basis'
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import { View } from 'react-native'
import { AppColors } from '../styles/AppStyles'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import moment from 'moment'

export interface ViewProps {
  datapoints?: BasisDatapoint[]
}

interface State {}

const INITIAL_STATE = {}

const Gradient = () => (
  <Defs key={'gradient'}>
    <LinearGradient id={'gradient'} x1={'0'} y1={'100%'} x2={'0'} y2={'50%'}>
      <Stop offset={'0%'} stopColor={'#96d5cf'} stopOpacity={0.0} />
      <Stop offset={'100%'} stopColor={'#96d5cf'} stopOpacity={0.6} />
    </LinearGradient>
  </Defs>
)

const xAxisHeight = 10
const xAxisMarginTop = 5
const verticalContentInset = { top: 10 }

export class Graph extends React.Component<ViewProps, State> {
  constructor(props: ViewProps) {
    super(props)
    this.state = INITIAL_STATE
  }

  render() {
    const data = this.props.datapoints ? [...this.props.datapoints] : []
    let dateFormat = 'M/D'

    if (data && data.length > 1) {
      const daysBetween = moment(data[data.length - 1].date).diff(moment(data[0].date), 'days')

      // Show hours if the range is a week or less
      if (daysBetween < 3) {
        dateFormat = 'ha'
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <YAxis
            style={{ marginRight: 10, marginBottom: xAxisHeight + xAxisMarginTop }}
            contentInset={verticalContentInset}
            data={data}
            yAccessor={value => value.item.priceInCents}
            numberOfTicks={7}
            scale={scale.scaleLinear}
            svg={{
              fontSize: 10,
              fill: AppColors.lightGreyText,
            }}
          />
          <View style={{ flex: 1 }}>
            <AreaChart
              style={{ flex: 1 }}
              contentInset={verticalContentInset}
              curve={shape.curveLinear}
              svg={{ fill: 'url(#gradient)', stroke: '#96d5cf', strokeWidth: 2 }}
              data={data}
              xScale={scale.scaleTime}
              yScale={scale.scaleLinear}
              numberOfTicks={7}
              xAccessor={value => value.item.date.valueOf()}
              yAccessor={value => value.item.priceInCents}
            >
              <Grid svg={{ fill: AppColors.veryLightGrey, strokeDasharray: '3', strokeWidth: 0.5 }} />
              <Gradient />
            </AreaChart>
            <XAxis
              style={{ height: xAxisHeight, marginTop: xAxisMarginTop }}
              data={data}
              scale={scale.scaleTime}
              numberOfTicks={5}
              xAccessor={value => value.item.date}
              formatLabel={value => moment(value).format(dateFormat)}
              svg={{ fontSize: 10, fill: AppColors.lightGreyText }}
            />
          </View>
        </View>
      </View>
    )
  }
}
