import { comment } from './comment'

export default {
  response: {
    200: {
      properties: {
        comments: {
          items: comment,
          type: 'array'
        }
      },
      type: 'object'
    }
  }
}
