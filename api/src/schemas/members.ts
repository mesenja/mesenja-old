import { member } from './member'

export default {
  response: {
    200: {
      properties: {
        members: {
          items: member,
          type: 'array'
        }
      },
      type: 'object'
    }
  }
}
