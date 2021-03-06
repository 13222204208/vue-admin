import request from '@/utils/request'

export function storeAccount(data) {
  return request({
    url: '/account',
    method: 'post',
    data
  })
}

export function indexAccount(query) {
  return request({
    url: '/account',
    method: 'get',
    params: query
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
