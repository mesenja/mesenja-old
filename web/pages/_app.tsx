import cookies from 'next-cookies'
import React from 'react'
import App, { Container, NextAppContext } from 'next/app'
import { StoreProvider } from 'easy-peasy'

import createStore from '../store'
import { api } from '../services'

import '../assets/main.scss'

interface Props {
  state: any
}

export default class Mesenja extends App<Props> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const { token } = cookies(ctx)

    const state: any = {}

    if (token) {
      api.setToken(token)

      const { team, user } = await api.profile()

      state.session = {
        team,
        user
      }
    }

    return {
      pageProps,
      state
    }
  }

  render() {
    const { Component, pageProps, state } = this.props

    const store = createStore(state)

    return (
      <Container>
        <StoreProvider store={store}>
          <Component {...pageProps} />
        </StoreProvider>
      </Container>
    )
  }
}
