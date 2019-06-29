import { team } from './team'

export default {
  response: {
    200: {
      properties: {
        teams: {
          items: team,
          type: 'array'
        }
      },
      type: 'object'
    }
  }
}
