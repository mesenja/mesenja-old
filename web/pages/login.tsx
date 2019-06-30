import Head from 'next/head'
import Router from 'next/router'
import React, { FunctionComponent } from 'react'

import { useStoreActions, useStoreState } from '../store'
import { FormLogin, Logo } from '../components'

import './login.scss'

const Login: FunctionComponent = () => {
  const { login } = useStoreActions(actions => actions.session)
  const { user } = useStoreState(state => state.session)

  if (user) {
    Router.replace('/home')

    return null
  }

  return (
    <main className="login__main">
      <Head>
        <title>Login: Mesenja</title>
      </Head>
      <Logo />
      <FormLogin className="login__form" onLogin={login} />
    </main>
  )
}

export default Login
