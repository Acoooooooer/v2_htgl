import Layout from 'layout' /* 外层组件  一级 */

// 权限路由, 异步
export const asyroutes = [
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    redirect: '/trademark',
    meta: { title: '管理系统', icon: 'iconfonthuangguan' },
    children: [
      {
        path: '/trademark',
        component: () => import('views/product/trademark'),
        name: 'Trademark',
        meta: { title: '品牌管理', icon: 'iconfontyundonghuwai' },
        children: [
          {
            path: '/trademark/additem',
            component: () => import('views/product/trademark/AddItem'),
            name: 'AddItem',
            meta: { title: 'AddItem' },
            hidden: true
          }
        ]
      },
      {
        path: '/spu',
        component: () => import('views/product/spu'),
        name: 'Spu',
        meta: { title: 'Spu管理', icon: 'iconfontzhaomingdianzi' }
      },
      {
        path: '/attr',
        component: () => import('views/product/attr'),
        name: 'Attr',
        meta: { title: '平台属性管理', icon: 'iconfontgongyichongwu' }
      },
      {
        path: '/sku',
        component: () => import('views/product/sku'),
        name: 'Sku',
        meta: { title: 'Sku管理', icon: 'icon1' }
      },
      {
        path: '/skusssss',
        component: () => import('views/product/sku'),
        name: 'Skusssss',
        meta: { title: 'Sku管理', icon: 'icon1' }
      }

    ]
  }
]

// 固定路由, 常量
export const constantroutes = [
  {
    path: '/login',
    component: () => import('views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('views/dashboard/index'),
      meta: { title: 'Echarts', icon: 'icon' }
    }]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
