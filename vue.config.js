// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
// 基础路径 注意发布之前要先修改这里
let baseUrl = '/'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  // 解决vendor打包太大 加载过慢 vue和element-ui走cdn
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'lodash': '_'
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  },

  productionSourceMap: false, // 是否生成map文件
  baseUrl: baseUrl, // 根据你的实际情况更改这里
  lintOnSave: true,
  devServer: {
    publicPath: baseUrl, // 和 baseUrl 保持一致
    proxy: {
      '/api/*': {
        target: 'http://test.api.la55l.cn/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
    // babel-polyfill 加入 entry
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
  }
}
