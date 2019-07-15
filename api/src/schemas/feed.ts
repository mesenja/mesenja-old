export const feed = {
  properties: {
    created: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    type: {
      type: 'string'
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
        feed: {
          items: feed,
          type: 'array'
        }
      },
      type: 'object'
    }
  }
}
