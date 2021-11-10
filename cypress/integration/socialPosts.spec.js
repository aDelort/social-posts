import { dayName } from '../../src/posts/PostsChart'

describe('When displaying the day of the week', () => {
  it('should return the expected format', () => {
    expect(dayName(2)).to.equal('Tuesday')
  })
})
