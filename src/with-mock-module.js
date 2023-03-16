mock('./math.js')

const { pow } = require('./math')

describe('Mock Module', () => {
  it('Should mock math module and export pow function', () => {
    expect(pow(2, 3)).toBe(8)
  })
})
