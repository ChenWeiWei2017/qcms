import http from './config'

export function sendCode(username) {
  return http({
    url: '/api/v1/auth/sms-code',
    method: 'get',
    params: { username }
  })
}

export function login(data) {
  return http({
    url: '/api/v1/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return http({
    url: '/api/v1/auth/logout',
    method: 'get'
  })
}

export function getInfo() {
  return http({
    url: '/api/v1/user/info',
    method: 'get'
  })
}
