import { FastifyInstance, RouteOptions } from 'fastify'

import { toJSON } from '../lib'
import { Team } from '../models'
import { schema_members } from '../schemas'

const getMembers: RouteOptions = {
  method: 'GET',
  schema: schema_members,
  url: '/members',
  async handler(request) {
    const { teamId, userId } = await request.jwtVerify()

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    await team.populate('members.user').execPopulate()

    return {
      members: toJSON('members', team.members)
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(getMembers)

  next()
}
