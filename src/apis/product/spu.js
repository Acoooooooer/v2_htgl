import { service as request } from 'util/request'

// 获取spu数据
export const getSpuDate = ({ page, limit, category3Id }) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  })
}

// 通过id获取spu信息  /admin/product/getSpuById/{spuId}
export const getSpuById = (spuId) => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

// 获取品牌信息  /admin/product/baseTrademark/getTrademarkList
export const getTrademarkList = () => {
  return request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}

// spu图片   GET /admin/product/spuImageList/{spuId}
export const spuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

// 平台全部销售属性   GET /admin/product/baseSaleAttrList
export const baseSaleAttrList = () => {
  return request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}

// 保存  POST /admin/product/saveSpuInfo
export const saveSpuInfo = (data) => {
  return request({
    url: '/admin/product/saveSpuInfo',
    method: 'post',
    data
  })
}
