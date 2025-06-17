module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    extract: false
  },
  outputDir: 'dist',
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: undefined
},
function (api) {
  api.chainWebpack(config => {
    config.resolve.alias
      .set('@', require('path').resolve(__dirname, 'src'))
      .set('assets', require('path').resolve(__dirname, 'src/assets'))
      .set('components', require('path').resolve(__dirname, 'src/components'))
      .set('views', require('path').resolve(__dirname, 'src/views'));
  });
};