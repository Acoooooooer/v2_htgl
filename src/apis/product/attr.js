// 三级联动
import { service as request } from 'util/request'

// 一级分类数据   /admin/product/get/category1
export const reqGetCategory1 = () => {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}

// 二级分类数据   /admin/product/get/category2/{id}
export const reqGetCategory2 = (id) => {
  return request({
    url: `/admin/product/getCategory2/${id}`,
    method: 'get'
  })
}

// 三级分类数据   /admin/product/get/category3/{id}
export const reqGetCategory3 = (id) => {
  return request({
    url: `/admin/product/getCategory3/${id}`,
    method: 'get'
  })
}

// 通过三级id获取相关数据
export const getAttrList = (idList) => {
  const { category1Id, category2Id, category3Id } = idList
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

// 添加属性和属性值的接口 /admin/product/saveAttrInfo
export const saveAttrInfo = (data) => {
  return request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}
/**
 * {
  "attrName": "string",
  "attrValueList": [
    {
      "attrId": 0,
      "id": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0,
  "categoryLevel": 0,
  "id": 0
}
 */

// 删除
export const deleteAttr = (attrId) => {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}
