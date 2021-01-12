import request from '@/utils/request'

export function storeAccount(data) {
  return request({
    url: '/account',
    method: 'post',
    data
  })
}

export function indexAccount() {
  return request({
    url: '/account',
    method: 'get',
  })
}

