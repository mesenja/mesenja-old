import * as bcrypt from 'bcrypt'
import { FastifyInstance, RouteOptions } from 'fastify'

import { User } from '../models'

const createUser: RouteOptions = {
  method: 'POST',
  url: '/users',
  async handler(request, reply) {
    const {
      body: {
        user: { email, name, password }
      }
    } = request

    const user = await User.create({
      email,
      name,
      password: await bcrypt.hash(password, 10)
    })

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

const getUser: RouteOptions = {
  method: 'GET',
  url: '/profile',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const user = await User.findById(userId)

    return {
      user: user.toJSON({
        virtuals: true
      })
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(createUser)
  fastify.route(getUser)

  next()
}
