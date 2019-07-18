import { team } from './team'
import { user } from './user'

export default {
  response: {
    201: {
      properties: {
        team,
        user,
        token: {
          type: 'string'
        }
      },
      type: 'object'
    }
  }
}
