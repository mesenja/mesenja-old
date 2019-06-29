import { FastifyInstance, RouteOptions } from 'fastify'

import { Team } from '../models'
import { schema_team } from '../schemas'

const getTeam: RouteOptions = {
  method: 'GET',
  schema: schema_team,
  url: '/team',
  async handler(request) {
    const { teamId, userId } = await request.jwtVerify()

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    return {
      team: team.toJSON({
        virtuals: true
      })
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(getTeam)

  next()
}
