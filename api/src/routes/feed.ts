import { FastifyInstance, RouteOptions } from 'fastify'

import { Feed, Team } from '../models'
import { schema_feed } from '../schemas'

const getFeed: RouteOptions = {
  method: 'GET',
  schema: schema_feed,
  url: '/feed',
  async handler(request) {
    const { teamId, userId } = await request.jwtVerify()

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    const feed = await Feed.find({
      team: team.id
    }).sort({
      created: -1
    })

    return {
      feed: feed.map(item =>
        item.toJSON({
          virtuals: true
        })
      )
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(getFeed)

  next()
}
