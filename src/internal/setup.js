const SINGLE_SPACES = '\u2002'
const DOUBLE_SPACES = '\u2002\u2002'
const errorMessage = (value, current) => `${value} is not equal to ${current}`

class AssertionError extends Error {
  constructor(expect, value) {
    const message = `Expected ${expect} but received ${value}`
    super(message)
    this.name = 'AssertionError'
  }
}

const afterAllFns = []
const afterEachFns = []

const afterAll = (fn) => {
  afterAllFns.push(fn)
}

const afterEach = (fn) => {
  afterEachFns.push(fn)
}

const describe = async (title, callback) => {
  try {
    console.log(SINGLE_SPACES, title)
    await callback()
  } catch (error) {
    console.error(error)
  }

  afterAllFns.forEach(fn => fn())
}

const it = async (title, callback) => {
  try {
    await callback()
    console.log(DOUBLE_SPACES, `✅ ${title}`)
  } catch (error) {
    console.error(DOUBLE_SPACES, `❌ ${title}`)
    console.error(DOUBLE_SPACES, error)
  }

  afterEachFns.forEach(fn => fn())
}

const mockFn = (fn) => {
  const _mockFn = (...args) => {
    _mockFn.mock.calls++
    return fn(...args)
  }

  _mockFn.mock = {
    calls: 0
  }

  return _mockFn
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
      if (typeof value !== 'function' || value.mock.calls !== expected) {
        throw new AssertionError(expected, value.mock.calls)
      }
    },
  }
}

global.describe = describe
global.afterAll = afterAll
global.afterEach = afterEach
global.test = it
global.it = it
global.mockFn = mockFn
global.expect = expect
