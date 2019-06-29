import { FastifyInstance, RouteOptions } from 'fastify'
import { kebabCase } from 'lodash'

import { Team, User } from '../models'

const getTeams: RouteOptions = {
  method: 'GET',
  url: '/teams',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const teams = await Team.find({
      _id: {
        $in: user.teams
      }
    })

    return {
      teams: teams.map(team =>
        team.toJSON({
          virtuals: true
        })
      )
    }
  }
}

const createTeam: RouteOptions = {
  method: 'POST',
  url: '/teams',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const {
      body: {
        team: { name }
      }
    } = request

    const team = new Team({
      name,
      slug: kebabCase(name)
    })

    await team.addMember(userId, 'owner')

    await team.save()

    return {
      team: team.toJSON({
        virtuals: true
      })
    }
  }
}

const getTeam: RouteOptions = {
  method: 'GET',
  url: '/teams/:teamId',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const {
      params: { teamId }
    } = request

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
  fastify.route(getTeams)
  fastify.route(createTeam)
  fastify.route(getTeam)

  next()
}
