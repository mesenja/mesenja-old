import * as bcrypt from 'bcrypt'
import { FastifyInstance, RouteOptions } from 'fastify'

import { User } from '../models'

const login: RouteOptions = {
  method: 'POST',
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
