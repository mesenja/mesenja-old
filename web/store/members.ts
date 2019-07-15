import { Action, Thunk, action, thunk } from 'easy-peasy'

import { api } from '../services'
import { User } from './session'

export interface Member {
  joined: string
  role: string
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
