const { defineConfig } = require('@vue/cli-service')

console.log(process.env.VUE_APP_BASE_API)
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://39.98.123.211',
        // target: 'http://localhost:5000',
        changeOrogin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ' '
        }
      }
    }
  },
  configureWebpack: () => ({
    resolve: {
      alias: {
        views: '@/views',
        com: '@/components',
        ste: '@/store',
        rou: '@/router',
        assets: '@/assets',
        apis: '@/apis',
        util: '@/util',
        styles: '@/styles',
        layout: '@/layout',
        icons: '@/icons'
      },
      fallback: { path: require.resolve('path-browserify') }
    }

  })
})
