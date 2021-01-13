import request from '@/utils/request'

export function storeAccount(data) {
  return request({
    url: '/account',
    method: 'post',
    data
  })
}

export function indexPermission() {
  return request({
    url: '/permission',
    method: 'get',
  })
}

export function delAccount(id) {
  return request({
    url: '/account/'+id,
    method: 'delete',
  })
}

export function updateAccount(id,data) {
  return request({
    url: '/account/'+id,
    method: 'patch',
    data
  })
}
