import { FastifyInstance, RouteOptions } from 'fastify'

import { User } from '../models'
import { schema_user } from '../schemas'

const getUser: RouteOptions = {
  method: 'GET',
  schema: schema_user,
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

    return {
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
