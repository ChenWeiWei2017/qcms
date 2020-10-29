if (process.env.NODE_ENV === 'development') {
  const { mockAPI } = require('src/mock')
  mockAPI()
}
