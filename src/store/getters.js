import moment from 'moment'

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  timer: () => (records) => {
    return records.map((v, i) => {
      v.timer = moment(
        moment().valueOf() - parseInt(Math.random() * 1000000000)
      ).format('L LTS')
      return v
    })
  },
  filsale: state => {
    const arr1 = state.spu.saleAttrList
    const arr2 = state.spu.spuData.spuSaleAttrList

    return arr1.filter(v => !arr2.some(_v => _v.saleAttrName === v.name))
  }
}
export default getters
