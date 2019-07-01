import Head from 'next/head'
import React, { FunctionComponent } from 'react'

import { FormLogin, Logo } from '../components'
import { Main } from '../layouts'
import { useStoreActions } from '../store'

import './login.scss'

const Login: FunctionComponent = () => {
  const { login } = useStoreActions(actions => actions.session)

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
