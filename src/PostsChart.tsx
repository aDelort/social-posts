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

type SocialPostDate = { weekDay: number; dayHour: number }

const socialPostDates: SocialPostDate[] = [
  { dayHour: 22, weekDay: 0 },
  { dayHour: 0, weekDay: 4 },
  { dayHour: 13, weekDay: 2 },
  { dayHour: 13, weekDay: 2 },
  { dayHour: 12, weekDay: 3 },
  { dayHour: 21, weekDay: 1 },
  { dayHour: 2, weekDay: 5 },
]

export const PostsChart: React.FC = () => {
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
      <XAxis type="number" dataKey="x" name="Hour of the day" />
      <YAxis type="number" dataKey="y" name="Day of the week" />
      <ZAxis
        type="number"
        dataKey="z"
        name="Number of posts"
        range={[200, 1000]}
      />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter
        name="Number of posts by day of the week and hour of the day"
        data={socialPostCounts}
        fill="rgb(0,171,85)"
      />
    </ScatterChart>
  )
}
