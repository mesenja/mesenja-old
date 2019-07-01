import cookies from 'next-cookies'
import React from 'react'
import Router from 'next/router'
import { Container, AppComponentType } from 'next/app'
import { StoreProvider } from 'easy-peasy'

import createStore from '../store'
import { api } from '../services'

import '../assets/main.scss'

interface Props {
  props: any
  state: any
}

const Mesenja: AppComponentType<Props> = ({ Component, state, props }) => {
  const store = createStore(state)

  return (
    <Container>
      <StoreProvider store={store}>
        <Component {...props} />
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

  let props = {}

  if (Component.getInitialProps) {
    props = await Component.getInitialProps(ctx)
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
    props,
    state
  }
}

export default Mesenja
