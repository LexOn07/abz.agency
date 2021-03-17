module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/mainStyle.scss";`
      }
    }
  },

  lintOnSave: false
};