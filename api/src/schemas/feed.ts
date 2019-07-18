export const feed = {
  properties: {
    created: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    team: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      },
      type: 'object'
    },
    type: {
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
        feed: {
          items: feed,
          type: 'array'
        }
      },
      type: 'object'
    }
  }
}
