import { mount } from '@cypress/react'
import { PostsChart } from './PostsChart'
import React from 'react'
import _ from 'lodash'
import faker from 'faker'
import { getDay, getHours } from 'date-fns/fp'

describe('When there is no social posts', () => {
  it('should not display any point', () => {
    mount(<PostsChart socialPostDates={[]} />)

    cy.get('#posts-chart')
      .should('be.visible')
      .get('.recharts-scatter-symbol')
      .should('have.length', 0)
  })
})

const randomTimestamp = () => Math.floor(faker.date.past(5).getTime())

describe('When all social posts have the same day of the week and hour of the day', () => {
  it('should only display one point', () => {
    const timestamp = randomTimestamp()

    const socialPostDate = {
      dayHour: getHours(timestamp),
      weekDay: getDay(timestamp),
    }

    const identicalSocialPostDates = _.fill(_.range(100), socialPostDate)

    mount(<PostsChart socialPostDates={identicalSocialPostDates} />)

    cy.get('#posts-chart')
      .should('be.visible')
      .get('.recharts-scatter-symbol')
      .should('have.length', 1)
  })
})

describe('When social posts are provided', () => {
  it('should display the corresponding points, grouping the same dates in unique points', () => {
    const socialPostDates = _.range(100)
      .map(randomTimestamp)
      .map((timestamp) => ({
        dayHour: getHours(timestamp),
        weekDay: getDay(timestamp),
      }))

    mount(<PostsChart socialPostDates={socialPostDates} />)

    const uniqueSocialPostDates = _.uniqWith(socialPostDates, _.isEqual)

    cy.get('#posts-chart')
      .should('be.visible')
      .get('.recharts-scatter-symbol')
      .should('have.length', uniqueSocialPostDates.length)
  })
})
