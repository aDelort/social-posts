import { x } from '@xstyled/styled-components'
import React from 'react'

export const PostsCount: React.FC<{ count: number }> = ({ count }) => (
  <x.p fontSize="2em" m="5em">
    <x.strong>{count}</x.strong> posts
  </x.p>
)
