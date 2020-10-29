const tokens = {
  admin: {
    token: 'admin-token',
    password: '123456'
  },
  editor: {
    token: 'editor-token',
    password: '123456'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar:
      'https://chenww-1259746772.cos.ap-shanghai.myqcloud.com/cmt/avatar/2-1564643605309.jpg',
    name: '管理员'
  },
  'editor-token': {
    roles: ['editor'],
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '采编'
  }
}

module.exports = [
  {
    url: '/api/v1/auth/smscode',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },
  {
    url: '/api/v1/auth/login',
    type: 'post',
    response: config => {
      const { username, password, smscode } = config.body
      if (smscode !== '1234') {
        return {
          code: 50002,
          message: '验证码错误'
        }
      }
      if (tokens[username] && tokens[username].password === password) {
        return {
          code: 20000,
          message: 'success',
          data: {
            token: tokens[username].token
          }
        }
      }
      return {
        code: 50001,
        message: '用户名或密码错误'
      }
    }
  },
  {
    url: '/api/v1/auth/logout',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },
  {
    url: '/api/v1/auth/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      if (!info) {
        return {
          code: 50003,
          message: '无效的token或token失效'
        }
      }

      return {
        code: 20000,
        message: 'success',
        data: info
      }
    }
  }
]
