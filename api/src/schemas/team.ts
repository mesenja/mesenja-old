export const team = {
  properties: {
    created: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    slug: {
      type: 'string'
    }
  },
  type: 'object'
}

export default {
  response: {
    200: {
      properties: {
        team
      },
      type: 'object'
    },
    201: {
      properties: {
        team
      },
      type: 'object'
    }
  }
}
