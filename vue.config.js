module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.173',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/apk': {
        target: 'http://192.168.0.172',
        changeOrigin: true,
        pathRewrite: {
          '^/apk': ''
        }
      },
      '/ap1': {
        target: 'http://192.168.0.171',
        changeOrigin: true,
        pathRewrite: {
          '^/ap1': ''
        }
      },
    }
  }
}