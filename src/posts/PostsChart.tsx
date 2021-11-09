import _ from 'lodash'
import React from 'react'
import {
  Legend,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import { format, setDay } from 'date-fns/fp'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'

export type SocialPostDate = { weekDay: number; dayHour: number }

const dayName = (dayIndex: number): string =>
  _.flow(setDay(dayIndex), format('EEEE'))(new Date())

const formatHours = (hour: number): string => `${hour}:00`

const tooltipFormatter = (
  value: number,
  _name: string,
  props: Payload<number, string>
): string =>
  props.dataKey === 'x'
    ? formatHours(value)
    : props.dataKey === 'y'
    ? dayName(value)
    : value.toString()

export const PostsChart: React.FC<{ socialPostDates: SocialPostDate[] }> = ({
  socialPostDates,
}) => {
  const aggregatedSocialPosts = _.groupBy(socialPostDates, JSON.stringify)

  const reducedSocialPosts = _.mapValues(aggregatedSocialPosts, (x) => x.length)

  const socialPostCounts = _.map(reducedSocialPosts, (numberOfPosts, key) => {
    const { dayHour, weekDay } = JSON.parse(key) as SocialPostDate
    return {
      x: dayHour,
      y: weekDay,
      z: numberOfPosts,
    }
  })

  return (
    <ScatterChart
      id="posts-chart"
      width={1500}
      height={800}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <XAxis
        type="number"
        dataKey="x"
        tickCount={26}
        name="Hour of the day"
        tickFormatter={(h) => (h >= 0 && h <= 23 ? formatHours(h) : '')}
        domain={[-1, 24]}
      />
      <YAxis
        type="number"
        dataKey="y"
        tickCount={9}
        reversed
        name="Day of the week"
        tickFormatter={(dayIndex) =>
          dayIndex >= 0 && dayIndex <= 6 ? dayName(dayIndex) : ''
        }
        domain={[-1, 7]}
      />
      <ZAxis
        type="number"
        dataKey="z"
        name="Number of posts"
        range={[200, 1000]}
      />
      <Tooltip
        cursor={{ strokeDasharray: '3 3' }}
        formatter={tooltipFormatter}
      />
      <Legend />
      <Scatter
        name="Number of posts by day of the week and hour of the day"
        data={socialPostCounts}
        fill="rgb(0,171,85)"
      />
    </ScatterChart>
  )
}
