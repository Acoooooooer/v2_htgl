/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// /**
//  * 判断用户名是否存在
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername (str) {
//   const validMap = ['admin', 'editor', '13700000000']
//   return validMap.indexOf(str.trim()) >= 0
// }
