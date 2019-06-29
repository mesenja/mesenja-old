import { FastifyInstance, RouteOptions } from 'fastify'

import { Post, Team } from '../models'

const getPosts: RouteOptions = {
  method: 'GET',
  url: '/teams/:slug/posts',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const {
      params: { slug }
    } = request

    const team = await Team.findOne({
      slug
    })

    if (!team) {
      throw new Error('Team not found')
    }

    if (!team.isMember(userId)) {
      throw new Error('Not a member')
    }

    const posts = await Post.find({
      team: team.id
    }).sort({
      created: -1
    })

    return {
      posts: posts.map(post =>
        post.toJSON({
          virtuals: true
        })
      )
    }
  }
}

const createPost: RouteOptions = {
  method: 'POST',
  url: '/teams/:slug/posts',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const {
      body: {
        post: { body, pinned }
      },
      params: { slug }
    } = request

    const team = await Team.findOne({
      slug
    })

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

    return {
      post: post.toJSON({
        virtuals: true
      })
    }
  }
}

const getPost: RouteOptions = {
  method: 'GET',
  url: '/teams/:slug/posts/:postId',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const {
      params: { postId, slug }
    } = request

    const team = await Team.findOne({
      slug
    })

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

    return {
      post: post.toJSON({
        virtuals: true
      })
    }
  }
}

const getComments: RouteOptions = {
  method: 'GET',
  url: '/teams/:slug/posts/:postId/comments',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const {
      params: { postId, slug }
    } = request

    const team = await Team.findOne({
      slug
    })

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

    return {
      comments: post.comments.map(comment =>
        // @ts-ignore
        comment.toJSON({
          virtuals: true
        })
      )
    }
  }
}

const createComment: RouteOptions = {
  method: 'POST',
  url: '/teams/:slug/posts/:postId/comments',
  async handler(request) {
    const { userId } = await request.jwtVerify()

    const {
      body: {
        comment: { body }
      },
      params: { postId, slug }
    } = request

    const team = await Team.findOne({
      slug
    })

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

    return {
      comment: comment.toJSON({
        virtuals: true
      })
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
