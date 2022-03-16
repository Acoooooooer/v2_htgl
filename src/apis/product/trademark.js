// 品牌管理数据
import { service as request } from 'util/request'

// 品牌列表
export const reqTradeMarkList = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

// 新增
// /admin/product/baseTrademark/save     post
// 修改
// /admin/product/baseTrademark/update    put
export const reqSaveOrUpdate = ({ id, logoUrl, tmName }) => {
  if (id) { // 修改
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: { id, logoUrl, tmName }
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: { logoUrl, tmName }
    })
  }
}

// 删除
// /admin/product/baseTrademark/remove/{id}
export const resDelete = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
