const { MONGO_URI, PORT, TOKEN_SECRET } = process.env

import * as cors from 'cors'
import * as fastify from 'fastify'
import * as jwt from 'fastify-jwt'
import * as mongoose from 'mongoose'

import routes from './routes'

mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true
})

const server = fastify()

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
