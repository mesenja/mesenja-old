const { API_URI } = process.env

const withSass = require('@zeit/next-sass')

module.exports = withSass({
  publicRuntimeConfig: {
    API_URI
  }
})
