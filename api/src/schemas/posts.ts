import { post } from './post'

export default {
  response: {
    200: {
      properties: {
        posts: {
          items: post,
          type: 'array'
        }
      },
      type: 'object'
    }
  }
}
