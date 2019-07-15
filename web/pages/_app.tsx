import '../assets/main.scss'

import { StoreProvider } from 'easy-peasy'
import { NextPage } from 'next'
import cookies from 'next-cookies'
import { Container } from 'next/app'
import Router from 'next/router'
import React from 'react'

import { api } from '../services'
import createStore from '../store'

interface Props {
  state: any
}

const Mesenja: NextPage<Props> = ({ Component, state }) => {
  const store = createStore(state)

  return (
    <Container>
      <StoreProvider store={store}>
        <Component />
      </StoreProvider>
    </Container>
  )
}

Mesenja.getInitialProps = async ({ Component, ctx }) => {
  const redirect = (path: string) => {
    const { res } = ctx

    if (res) {
      res.writeHead(302, {
        Location: path
      })

      res.end()
    } else {
      Router.replace(path)
    }
  }

  const state: any = {}

  const { token } = cookies(ctx)

  if (token) {
    api.setToken(token)

    const { team, user } = await api.profile()

    state.session = {
      team,
      user
    }
  }

  if (Component.getInitialProps) {
    const props = await Component.getInitialProps(ctx)

    Object.assign(state, props)
  }

  const { pathname } = ctx

  if (state.session && /(login|register|\/$)/.test(pathname)) {
    redirect('/feed')
  } else if (
    !state.session &&
    /(feed|posts|messages|members|settings)/.test(pathname)
  ) {
    redirect('/')
  }

  return {
    state
  }
}

export default Mesenja
