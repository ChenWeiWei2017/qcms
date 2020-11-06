import http from './config'

export function getDepartments() {
  return http({
    url: '/api/v1/management/departments',
    method: 'get'
  })
}

export function updateDepartment(data) {
  return http({
    url: '/api/v1/management/department',
    method: 'put',
    data
  })
}

export function createDepartment(data) {
  return http({
    url: '/api/v1/management/department',
    method: 'post',
    data
  })
}

export function deleteDepartment(id) {
  return http({
    url: '/api/v1/management/department',
    method: 'delete',
    data: {id}
  })
}

export function queryUser(data) {
  return http({
    url: '/api/v1/management/users',
    method: 'get',
    params: data
  })
}
