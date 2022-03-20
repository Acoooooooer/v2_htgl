const { defineConfig } = require('@vue/cli-service')

console.log(process.env.VUE_APP_BASE_API)
const isDev = process.env.NODE_ENV === 'development'
console.log(isDev ? 'development' : 'production')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: isDev,
  publicPath: isDev ? ' ' : './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        changeOrogin: true,
        pathRewrite: {
          '^/api': ' '
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
