import { FastifyInstance, RouteOptions } from 'fastify'

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
      team: team.toJSON({
        virtuals: true
      }),
      user: user.toJSON({
        virtuals: true
      })
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(getUser)

  next()
}
