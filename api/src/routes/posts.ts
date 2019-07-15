import { FastifyInstance, RouteOptions } from 'fastify'

import { toJSON } from '../lib'
import { Post, Team } from '../models'
import {
  schema_comment,
  schema_comments,
  schema_post,
  schema_posts
} from '../schemas'

const getPosts: RouteOptions = {
  method: 'GET',
  schema: schema_posts,
  url: '/posts',
  async handler(request) {
    const { teamId, userId } = await request.jwtVerify()

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    const posts = await Post.find({
      team: team.id
    })
      .populate('user')
      .sort({
        created: -1
      })

    return {
      posts: toJSON('posts', {
        posts,
        userId
      })
    }
  }
}

const createPost: RouteOptions = {
  method: 'POST',
  schema: schema_post,
  url: '/posts',
  async handler(request, reply) {
    const { teamId, userId } = await request.jwtVerify()

    const {
      body: {
        post: { body, pinned }
      }
    } = request

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    const post = new Post({
      body,
      pinned,
      team: team.id,
      user: userId
    })

    post.addLike(userId)
    post.addSeen(userId)

    await post.save()

    await post.populate('user').execPopulate()

    reply.status(201)

    return {
      post: toJSON('post', {
        post,
        userId
      })
    }
  }
}

const getPost: RouteOptions = {
  method: 'GET',
  schema: schema_post,
  url: '/posts/:postId',
  async handler(request) {
    const { teamId, userId } = await request.jwtVerify()

    const {
      params: { postId }
    } = request

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    const post = await Post.findOne({
      _id: postId,
      team: team.id
    })

    if (!post) {
      throw new Error('Post not found')
    }

    await post.populate('user').execPopulate()

    return {
      post: toJSON('post', {
        post,
        userId
      })
    }
  }
}

const getComments: RouteOptions = {
  method: 'GET',
  schema: schema_comments,
  url: '/posts/:postId/comments',
  async handler(request) {
    const { teamId, userId } = await request.jwtVerify()

    const {
      params: { postId }
    } = request

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    const post = await Post.findOne({
      _id: postId,
      team: team.id
    })

    if (!post) {
      throw new Error('Post not found')
    }

    await post.populate('comments.user').execPopulate()

    return {
      comments: toJSON('comments', post.comments)
    }
  }
}

const createComment: RouteOptions = {
  method: 'POST',
  schema: schema_comment,
  url: '/posts/:postId/comments',
  async handler(request, reply) {
    const { teamId, userId } = await request.jwtVerify()

    const {
      body: {
        comment: { body }
      },
      params: { postId }
    } = request

    const team = await Team.findById(teamId)

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    const post = await Post.findOne({
      _id: postId,
      team: team.id
    })

    if (!post) {
      throw new Error('Post not found')
    }

    const comment = post.addComment(userId, body)

    await post.save()

    await comment.populate('user').execPopulate()

    reply.status(201)

    return {
      comment: toJSON('comment', comment)
    }
  }
}

export default (fastify: FastifyInstance, options: any, next: any) => {
  fastify.route(getPosts)
  fastify.route(createPost)
  fastify.route(getPost)

  fastify.route(getComments)
  fastify.route(createComment)

  next()
}
