module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-module-decorators',
    '@koumoul/vjsf',
    'vuex-persist'
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Fajiroll'
        return args
      })
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
}
