import { Action, Thunk, action, thunk } from 'easy-peasy'

import { api } from '../services'
import { User } from './session'

export interface Post {
  body: string
  created: string
  id: string
  liked: boolean
  likes: string[]
  meta: {
    comments: number
    likes: number
  }
  pinned: boolean
  seen: string[]
  user: User
}

export interface PostsModel {
  posts: Post[]

  fetch: Thunk<PostsModel>

  set: Action<PostsModel, Post[]>
}

const posts: PostsModel = {
  posts: [],

  fetch: thunk(async actions => {
    const { posts } = await api.posts()

    actions.set(posts)
  }),

  set: action((state, payload) => {
    state.posts = payload
  })
}

export default posts
