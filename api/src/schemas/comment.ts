export const comment = {
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
        comment
      },
      type: 'object'
    },
    201: {
      properties: {
        comment
      },
      type: 'object'
    }
  }
}
