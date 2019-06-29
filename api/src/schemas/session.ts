import { team } from './team'
import { user } from './user'

export default {
  response: {
    201: {
      properties: {
        token: {
          type: 'string'
        },
        team,
        user
      },
      type: 'object'
    }
  }
}
