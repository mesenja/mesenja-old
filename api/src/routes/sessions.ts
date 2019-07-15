import { FastifyInstance, RouteOptions } from 'fastify'

import { toJSON } from '../lib'
import { Team, User } from '../models'
import { schema_session } from '../schemas'

const register: RouteOptions = {
  method: 'POST',
  schema: schema_session,
  url: '/register',
  async handler(request, reply) {
    const {
      body: {
        team: { name: teamName },
        user: { email, name, password }
      }
    } = request

    const { team, user } = await Team.createNew(teamName, name, email, password)

    const token = await reply.jwtSign({
      teamId: team.id,
      userId: user.id
    })

    reply.status(201)

    return {
      token,
      team: toJSON('team', team),
      user: toJSON('user', user)
    }
  }
}

const login: RouteOptions = {
  method: 'POST',
  schema: schema_session,
  url: '/login',
  async handler(request, reply) {
    const {
      body: {
        user: { email, password }
      }
    } = request

    const { team, user } = await User.login(email, password)

    const token = await reply.jwtSign({
      teamId: team.id,
      userId: user.id
    })

    reply.status(201)

    return {
      token,
      team: toJSON('team', team),
      user: toJSON('user', user)
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(register)
  fastify.route(login)

  next()
}
