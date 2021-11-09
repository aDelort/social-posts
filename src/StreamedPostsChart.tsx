import { x } from '@xstyled/styled-components'
import { getDay, getHours, secondsToMilliseconds } from 'date-fns/fp'
import React from 'react'
import { PostsChart, SocialPostDate } from './PostsChart'
import { PostsCount } from './PostsCount'

export const SERVER_SENT_EVENTS_URL = 'http://stream.upfluence.co/stream'

enum PostType {
  PIN = 'pin',
  INSTAGRAM_MEDIA = 'instagram_media',
  YOUTUBE_VIDEO = 'youtube_video',
  ARTICLE = 'article',
  TWEET = 'tweet',
  FACEBOOK_STATUS = 'facebook_status',
}

type Post = Record<PostType, { timestamp: number }>

export const StreamedPostsChart: React.FC = () => {
  const [socialPosts, setSocialPosts] = React.useState<SocialPostDate[]>([])

  React.useEffect(() => {
    const eventSource = new EventSource(SERVER_SENT_EVENTS_URL)

    eventSource.addEventListener('message', (event) => {
      const post: Post = JSON.parse(event.data)

      const { timestamp } = post[PostType.PIN] ??
        post[PostType.INSTAGRAM_MEDIA] ??
        post[PostType.YOUTUBE_VIDEO] ??
        post[PostType.ARTICLE] ??
        post[PostType.TWEET] ??
        post[PostType.FACEBOOK_STATUS] ?? { timestamp: null }

      if (timestamp) {
        const millisecondTimestamp = secondsToMilliseconds(timestamp)

        setSocialPosts(
          socialPosts.concat({
            dayHour: getHours(millisecondTimestamp),
            weekDay: getDay(millisecondTimestamp),
          })
        )
      }
    })

    return () => eventSource.close()
  }, [socialPosts])

  return (
    <x.div display="flex" flexDirection="row" alignItems="center">
      <PostsChart socialPostDates={socialPosts} />
      <PostsCount count={socialPosts.length} />
    </x.div>
  )
}
