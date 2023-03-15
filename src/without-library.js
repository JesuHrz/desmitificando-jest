const { sum, subtract, multiply, divide } = require('./math')

const mockFunc = (fn) => {
  const _mockFunc = (...args) => {
    _mockFunc.mock.calls++
    fn(args)
  }

  _mockFunc.mock = {
    calls: 0
  }

  return _mockFunc
}

const expect = (value) => {
  return {
    toBe(expected) {
      if (value !== expected) {
        throw new AssertionError(expected, value)
      }
    },
    toBeTruthy() {
      if (typeof value !== 'boolean' || value !== true) {
        throw new AssertionError(true, value)
      }
    },
    toBeFalsy() {
      if (typeof value !== 'boolean' || value !== false) {
        throw new AssertionError(false, value)
      }
    },
    toHaveBeenCalledTimes(expected) {
      if (typeof value !== 'function' && value.mock.calls.length !== expected) {
        throw new AssertionError(expected, value)
      }
    },
  }
}

let result, expected

result = sum(3, 7)
expected = 10
expect(result).toBe(expected)

result = subtract(7, 3)
expected = 4
expect(result).toBe(expected)

result = multiply(2, 2)
expected = 4
expect(result).toBe(expected)

result = divide(12, 3)
expected = 4
expect(result).toBe(expected)

const mockedSum = mockFunc(sum)

mockedSum(3, 7)
expect(mockedSum).toHaveBeenCalledTimes(1)
