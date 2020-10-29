const Mock = require('mockjs')

const { param2Obj } = require('./utils')
const home = require('./home')
const auth = require('./auth')

const mocks = [...home, ...auth]

Mock.setup({
  // 模拟延时效果
  timeout: '200-2000'
})

function mockAPI() {
  // 转化一下信息
  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  // 将所有模拟api注册到mock中
  mocks.forEach(item =>
    Mock.mock(
      new RegExp(item.url),
      item.type || 'get',
      XHR2ExpressReqWrap(item.response)
    )
  )
}

module.exports = {
  mocks,
  mockAPI
}
