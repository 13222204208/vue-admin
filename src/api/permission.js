import request from '@/utils/request'

export function storePermission(data) {
  return request({
    url: '/permission',
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

export function delPermission(id) {
  return request({
    url: '/permission/'+id,
    method: 'delete',
  })
}

export function updatePermission(id,data) {
  return request({
    url: '/permission/'+id,
    method: 'patch',
    data
  })
}
