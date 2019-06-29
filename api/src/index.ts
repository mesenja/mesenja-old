const { MONGO_URI, NODE_ENV, PORT, TOKEN_SECRET } = process.env

import * as cors from 'cors'
import * as fastify from 'fastify'
import * as mongoose from 'mongoose'
import * as jwt from 'fastify-jwt'

import routes from './routes'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true
})

const server = fastify({
  logger: NODE_ENV === 'development'
})

server.use(cors())

server.register(jwt, {
  secret: TOKEN_SECRET
})

server.register(routes, {
  prefix: 'v1'
})

const port = Number(PORT)

server.listen(port, '0.0.0.0', error => {
  if (error) {
    throw error
  }

  console.log(`Listening on ${port}`)
})

export default server
