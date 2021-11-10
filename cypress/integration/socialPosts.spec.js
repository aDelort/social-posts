import { dayName, formatHours } from '../../src/posts/PostsChart'

describe('When displaying the day of the week', () => {
  it('should return the expected format', () => {
    expect(dayName(2)).to.equal('Tuesday')
  })
})

describe('When displaying the hour of the day', () => {
  it('should return the expected format', () => {
    expect(formatHours(13)).to.equal('13:00')
  })
})
