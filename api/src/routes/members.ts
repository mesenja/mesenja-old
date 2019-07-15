import { FastifyInstance, RouteOptions } from 'fastify'

import { toJSON } from '../lib'
import { Post, Team } from '../models'
import { schema_member, schema_members } from '../schemas'

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

const getMember: RouteOptions = {
  method: 'GET',
  schema: schema_member,
  url: '/member/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const { teamId, userId } = await request.jwtVerify()

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    await team.populate('members.user').execPopulate()

    const member = team.members.find(member => member.user.equals(id))

    if (!member) {
      throw new Error('Member not found')
    }

    const posts = await Post.find({
      user: member.user.id
    })
      .sort({
        created: -1
      })
      .limit(10)
      .populate('user')

    return toJSON('member', {
      member,
      posts,
      userId
    })
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(getMembers)
  fastify.route(getMember)

  next()
}
