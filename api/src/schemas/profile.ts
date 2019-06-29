import { team } from './team'
import { user } from './user'

export default {
  response: {
    200: {
      properties: {
        team,
        user
      },
      type: 'object'
    }
  }
}
