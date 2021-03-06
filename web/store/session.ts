import { Action, Thunk, action, thunk } from 'easy-peasy'
import cookie from 'js-cookie'
import Router from 'next/router'

import { api } from '../services'
import { LoginProps, RegisterProps, User } from './users'

export interface Team {
  created: string
  id: string
  name: string
  slug: string
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

const logout = () => {
  cookie.remove('token')

  Router.replace('/')
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
    state.team = undefined
    state.user = undefined

    logout()
  }),
  session: action((state, payload) => {
    Object.assign(state, payload)
  })
}

export default user
