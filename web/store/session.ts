import cookie from 'js-cookie'
import { Action, Thunk, action, thunk } from 'easy-peasy'

import { api } from '../services'

export interface User {
  created: string
  email: string
  id: string
  name: string
}

export interface Team {
  created: string
  id: string
  name: string
  slug: string
}

export interface RegisterProps {
  email: string
  name: string
  password: string
  teamName: string
}

export interface LoginProps {
  email: string
  password: string
}

export interface SessionProps {
  team?: Team
  user?: User
}

export interface SessionModel {
  team?: Team
  user?: User

  register: Thunk<SessionModel, RegisterProps>
  login: Thunk<SessionModel, LoginProps>
  fetchUser: Thunk<SessionModel>

  session: Action<SessionModel, SessionProps>
}

const user: SessionModel = {
  register: thunk(async (actions, { email, name, password, teamName }) => {
    const response = await api.register(name, email, password, teamName)

    const { token } = response

    cookie.set('token', token)

    actions.session(response)
  }),
  login: thunk(async (actions, { email, password }) => {
    const response = await api.login(email, password)

    const { token } = response

    cookie.set('token', token)

    actions.session(response)
  }),
  fetchUser: thunk(async actions => {
    const response = await api.profile()

    actions.session(response)
  }),

  session: action((state, payload) => {
    Object.assign(state, payload)
  })
}

export default user