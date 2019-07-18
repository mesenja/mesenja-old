import { Action, Thunk, action, thunk } from 'easy-peasy'

import { api } from '../services'
import { Team } from './session'
import { User } from './users'

export interface Feed {
  created: string
  id: string
  team: Team
  type: string
  user: User
}

export interface FeedModel {
  feed: Feed[]

  fetch: Thunk<FeedModel>

  set: Action<FeedModel, Feed[]>
}

const feed: FeedModel = {
  feed: [],

  fetch: thunk(async actions => {
    const { feed } = await api.feed()

    actions.set(feed)
  }),

  set: action((state, payload) => {
    state.feed = payload
  })
}

export default feed
