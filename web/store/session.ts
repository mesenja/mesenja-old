import { Action, Thunk, action, thunk } from 'easy-peasy'
import cookie from 'js-cookie'
import Router from 'next/router'

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

  logout: Action<SessionModel>
  session: Action<SessionModel, SessionProps>
}

const login = (token: string) => {
  cookie.set('token', token)

  Router.replace('/feed')
}

const user: SessionModel = {
  register: thunk(async (actions, { email, name, password, teamName }) => {
    const response = await api.register(name, email, password, teamName)

    const { token } = response

    login(token)

    actions.session(response)
  }),
  login: thunk(async (actions, { email, password }) => {
    const response = await api.login(email, password)

    const { token } = response

    login(token)

    actions.session(response)
  }),
  fetchUser: thunk(async actions => {
    const response = await api.profile()

    actions.session(response)
  }),

  logout: action(state => {
    cookie.remove('token')

    state.team = undefined
    state.user = undefined
  }),
  session: action((state, payload) => {
    Object.assign(state, payload)
  })
}

export default user
