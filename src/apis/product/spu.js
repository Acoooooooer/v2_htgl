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

// 修改  POST /admin/product/saveSpuInfo
export const saveSpuInfo = (data) => {
  return request({
    url: '/admin/product/saveSpuInfo',
    method: 'post',
    data
  })
}

// 添加  /admin/product/updateSpuInfo
export const updateSpuInfo = (data) => {
  return request({
    url: '/admin/product/updateSpuInfo',
    method: 'post',
    data
  })
}

// 删除  /admin/product/updateSpuInfo
export const deleteSpu = (spuId) => {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}

// spu图片   GET /admin/product/spuImageList/{spuId}
export const skuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

// 获取销售属性   GET /admin/product/spuSaleAttrList/{spuId}
export const skuSaleAttrList = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

// 获取平台属性   GET  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const skuAttrInfoList = (data) => {
  const { category1Id, category2Id, category3Id } = data
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

// 保存sku  POST /admin/product/saveSkuInfo
export const skuSaveSkuInfo = (data) => {
  return request({
    url: 'admin/product/saveSkuInfo',
    method: 'POST',
    data
  })
}

// 通过spu查看sku  get /admin/product/saveSkuInfo
export const skuFindBySpuId = (spuId) => {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
