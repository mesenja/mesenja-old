import Head from 'next/head'
import Router from 'next/router'
import React, { FunctionComponent } from 'react'

import { FormLogin, Logo } from '../components'
import { Main } from '../layouts'
import { useStoreActions, useStoreState } from '../store'

import './login.scss'

const Login: FunctionComponent = () => {
  const { login } = useStoreActions(actions => actions.session)
  const { user } = useStoreState(state => state.session)

  if (user) {
    Router.replace('/home')

    return null
  }

  return (
    <Main className="login__main">
      <Head>
        <title>Login: Mesenja</title>
      </Head>
      <Logo />
      <FormLogin className="login__form" onLogin={login} />
    </Main>
  )
}

export default Login
