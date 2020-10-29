import http from './config'

export function sendCode(username) {
  return http({
    url: '/api/v1/auth/smscode',
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

export function getInfo(token) {
  return http({
    url: '/api/v1/auth/info',
    method: 'get',
    params: { token }
  })
}
