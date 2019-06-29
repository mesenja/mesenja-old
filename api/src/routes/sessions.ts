import * as bcrypt from 'bcrypt'
import { FastifyInstance, RouteOptions } from 'fastify'

import { User } from '../models'
import { schema_session } from '../schemas'

const login: RouteOptions = {
  method: 'POST',
  schema: schema_session,
  url: '/sessions',
  async handler(request, reply) {
    const {
      body: {
        user: { email, password }
      }
    } = request

    const user = await User.findOne({
      email
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid password')
    }

    const token = await reply.jwtSign({
      userId: user.id
    })

    reply.status(201)

    return {
      token,
      user: user.toJSON({
        virtuals: true
      })
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(login)

  next()
}
