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
