import { Action, Thunk, action, thunk } from 'easy-peasy'

import { api } from '../services'
import { Post } from './posts'
import { User } from './users'

export interface Member {
  joined: string
  role: string
  posts?: Post[]
  user: User
}

export interface MembersModel {
  members: Member[]

  fetch: Thunk<MembersModel>

  set: Action<MembersModel, Member[]>
}

const members: MembersModel = {
  members: [],

  fetch: thunk(async actions => {
    const { members } = await api.members()

    actions.set(members)
  }),

  set: action((state, payload) => {
    state.members = payload
  })
}

export default members
