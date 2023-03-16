const { sum, subtract, multiply, divide } = require('./math')

describe('Math Module', () => {
  afterAll(() => console.log('afterAll'))
  afterEach(() => console.log('afterEach'))

  it('Should sum 4 and 7 numbers', () => {
    expect(sum(3, 7)).toBe(10)
  })

  it('Should subtract 3 and 7 numbers', () => {
    expect(subtract(3, 7)).toBe(-4)
  })

  it('Should multiply 2 and 2 numbers ', () => {
    expect(multiply(2, 2)).toBe(4)
  })

  it('Should divide 12 and 3 numbers', () => {
    expect(divide(12, 3)).toBe(4)
  })

  // This will fail ❌
  it('Should sum 5 and 7 numbers ', () => {
    expect(sum(5, 7)).toBe(11)
  })

  it('Should sum function be call once', () => {
    const mockedSum = mockFn((a, b) => a + b)

    const result = mockedSum(3, 7)
    expect(result).toBe(10)
    expect(mockedSum).toHaveBeenCalledTimes(1)
  })
})
