import { FastifyInstance } from 'fastify'

import posts from './posts'
import sessions from './sessions'
import teams from './teams'
import users from './users'

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.register(posts)
  fastify.register(sessions)
  fastify.register(teams)
  fastify.register(users)

  next()
}
