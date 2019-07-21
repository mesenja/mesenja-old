import axios, { AxiosRequestConfig } from 'axios'
import cookie from 'js-cookie'
import getConfig from 'next/config'

import { FetchProps as FetchPostsProps } from '../store/posts'

const {
  publicRuntimeConfig: { API_URI }
} = getConfig()

class API {
  token?: string

  constructor() {
    const token = cookie.get('token')

    if (token) {
      this.setToken(token)
    }
  }

  setToken(token: string) {
    this.token = token
  }

  register(name: string, email: string, password: string, teamName: string) {
    return this.request('/register', 'post', {
      team: {
        name: teamName
      },
      user: {
        email,
        name,
        password
      }
    })
  }

  login(email: string, password: string) {
    return this.request('/login', 'post', {
      user: {
        email,
        password
      }
    })
  }

  profile() {
    return this.request('/profile')
  }

  feed() {
    return this.request('/feed')
  }

  posts(props?: FetchPostsProps) {
    return this.request('/posts', 'get', props)
  }

  members() {
    return this.request('/members')
  }

  member(id: string) {
    return this.request(`/members/${id}`)
  }

  async request(name: string, method?: any, body?: any) {
    const headers: any = {}

    if (this.token) {
      headers.authorization = `Bearer ${this.token}`
    }

    const options: AxiosRequestConfig = {
      headers,
      method,
      url: API_URI + name
    }

    if (/(post|put)/i.test(method)) {
      options.data = body
    } else {
      options.params = body
    }

    const { data } = await axios(options)

    return data
  }
}

export default new API()
