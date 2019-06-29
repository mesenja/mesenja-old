export const post = {
  properties: {
    body: {
      type: 'string'
    },
    created: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    liked: {
      type: 'boolean'
    },
    likes: {
      items: {
        type: 'string'
      },
      type: 'array'
    },
    meta: {
      properties: {
        comments: {
          type: 'number'
        }
      },
      type: 'object'
    },
    pinned: {
      type: 'boolean'
    },
    seen: {
      items: {
        type: 'string'
      },
      type: 'array'
    },
    user: {
      type: 'string'
    }
  },
  type: 'object'
}

export default {
  response: {
    200: {
      properties: {
        post
      },
      type: 'object'
    },
    201: {
      properties: {
        post
      },
      type: 'object'
    }
  }
}
