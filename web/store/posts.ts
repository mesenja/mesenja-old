import { Action, Thunk, action, thunk } from 'easy-peasy'
import { uniqBy } from 'lodash'

import { api } from '../services'
import { User } from './users'

export interface Post {
  body: string
  created: string
  id: string
  liked: boolean
  meta: {
    comments: number
    likes: number
  }
  pinned: boolean
  tagged: string[]
  user: User
}

export interface FetchProps {
  after?: number
  before?: string
  limit?: string
}

export interface PostsModel {
  loading: boolean
  posts: Post[]

  fetch: Thunk<PostsModel, FetchProps>

  setLoading: Action<PostsModel, boolean>
  setPosts: Action<PostsModel, Post[]>
}

const posts: PostsModel = {
  loading: false,
  posts: [],

  fetch: thunk(async (actions, payload) => {
    actions.setLoading(true)

    const { posts } = await api.posts(payload)

    actions.setPosts(posts)

    actions.setLoading(false)
  }),

  setLoading: action((state, payload) => {
    state.loading = payload
  }),
  setPosts: action((state, payload) => {
    state.posts = uniqBy([...state.posts, ...payload], 'id')
  })
}

export default posts
