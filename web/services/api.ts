import axios from 'axios'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URI }
} = getConfig()

class API {
  token?: string

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

  members() {
    return this.request('/members')
  }

  async request(name: string, method?: any, body?: any) {
    const headers: any = {}

    if (this.token) {
      headers.authorization = `Bearer ${this.token}`
    }

    const { data } = await axios({
      headers,
      method,
      data: body,
      url: API_URI + name
    })

    return data
  }
}

export default new API()
