import { FastifyInstance } from 'fastify'

import feed from './feed'
import members from './members'
import posts from './posts'
import sessions from './sessions'
import teams from './teams'
import users from './users'

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.register(feed)
  fastify.register(members)
  fastify.register(posts)
  fastify.register(sessions)
  fastify.register(teams)
  fastify.register(users)

  next()
}
