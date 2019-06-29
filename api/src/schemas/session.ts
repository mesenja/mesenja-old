import { user } from './user'

export default {
  response: {
    201: {
      properties: {
        token: {
          type: 'string'
        },
        user
      },
      type: 'object'
    }
  }
}
