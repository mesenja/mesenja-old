export const user = {
  properties: {
    created: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    teams: {
      items: {
        type: 'string'
      },
      type: 'array'
    }
  },
  type: 'object'
}

export default {
  response: {
    200: {
      properties: {
        user
      },
      type: 'object'
    }
  }
}
