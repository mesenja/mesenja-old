const { API_URI } = process.env

const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript(
  withSass({
    publicRuntimeConfig: {
      API_URI
    }
  })
)
