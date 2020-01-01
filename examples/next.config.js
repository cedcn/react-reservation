const debug = process.env.NODE_ENV !== 'production'
const withCSS = require('@zeit/next-css')

const config = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    }
  },
  assetPrefix: !debug ? '/react-reservation' : '',
  publicRuntimeConfig: {
    linkPrefix: !debug ? '/react-reservation' : '',
  },
}

module.exports = withCSS(config)
