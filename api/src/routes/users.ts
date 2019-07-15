import { FastifyInstance, RouteOptions } from 'fastify'

import { toJSON } from '../lib'
import { Team, User } from '../models'
import { schema_profile } from '../schemas'

const getUser: RouteOptions = {
  method: 'GET',
  schema: schema_profile,
  url: '/profile',
  async handler(request) {
    const { teamId, userId } = await request.jwtVerify()

    const user = await User.findOne({
      _id: userId,
      team: teamId
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (!user) {
      throw new Error('User not found')
    }

    const team = await Team.findById(user.team)

    if (!team) {
      throw new Error('Team not found')
    }

    return {
      team: toJSON('team', team),
      user: toJSON('user', user)
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(getUser)

  next()
}
