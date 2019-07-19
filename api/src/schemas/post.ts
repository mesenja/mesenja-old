export const post = {
  properties: {
    body: {
      type: 'string'
    },
    commented: {
      type: 'boolean'
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
    meta: {
      properties: {
        comments: {
          type: 'number'
        },
        likes: {
          type: 'number'
        }
      },
      type: 'object'
    },
    pinned: {
      type: 'boolean'
    },
    tagged: {
      items: {
        type: 'string'
      },
      type: 'array'
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
