export const feed = {
  properties: {
    created: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    team: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      }
    },
    type: {
      type: 'string'
    },
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      }
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
