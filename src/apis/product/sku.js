import { service as request } from 'util/request'

// sku 列表   GET /admin/product/list/{page}/{limit}
export const skuList = ({ page, limit }) => {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}

// 上架 GET /admin/product/onSale/{skuId}
export const onSale = (skuId) => {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}

// 下架 GET /admin/product/cancelSale/{skuId}
export const cancelSale = (skuId) => {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}

// 获取 sku 某行数据的详情  /admin/product/getSkuById/{skuId}
export const getSkuById = (skuId) => {
  return request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
  })
}

// 删除 sku 某行数据的详情  DELETE /admin/product/deleteSku/{skuId}
export const deleteSku = (skuId) => {
  return request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  })
}
