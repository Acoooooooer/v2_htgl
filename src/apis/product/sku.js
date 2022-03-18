import { service as request } from 'util/request'

// sku 列表   GET /admin/product/list/{page}/{limit}
export const skuList = ({ page, spuId }) => {
  return request({
    url: `/admin/product/list/${page}/${spuId}`,
    method: 'get'
  })
}
