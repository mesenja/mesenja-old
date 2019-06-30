import * as bcrypt from 'bcrypt'
import { FastifyInstance, RouteOptions } from 'fastify'
import { kebabCase } from 'lodash'

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

    const team = new Team({
      name: teamName,
      slug: kebabCase(teamName)
    })

    const user = await User.create({
      email,
      name,
      password: await bcrypt.hash(password, 10)
    })

    await team.addMember(user.id, 'owner')

    const token = await reply.jwtSign({
      teamId: team.id,
      userId: user.id
    })

    reply.status(201)

    return {
      token,
      team: team.toJSON({
        virtuals: true
      }),
      user: user.toJSON({
        virtuals: true
      })
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

    const user = await User.findOne({
      email
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid password')
    }

    const team = await Team.findById(user.team)

    if (!team) {
      throw new Error('Team not found')
    }

    const token = await reply.jwtSign({
      teamId: team.id,
      userId: user.id
    })

    reply.status(201)

    return {
      token,
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
  fastify.route(register)
  fastify.route(login)

  next()
}
