import { post } from './post'

export const member = {
  properties: {
    joined: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    user: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      },
      type: 'object'
    }
  },
  type: 'object'
}

export default {
  response: {
    200: {
      properties: {
        member,
        posts: {
          items: post,
          type: 'array'
        }
      },
      type: 'object'
    }
  }
}
