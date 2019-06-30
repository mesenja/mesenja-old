import Head from 'next/head'
import Router from 'next/router'
import React, { FunctionComponent } from 'react'

import { useStoreActions, useStoreState } from '../store'
import { FormSignUp, Logo } from '../components'

import './register.scss'

const Register: FunctionComponent = () => {
  const { register } = useStoreActions(actions => actions.session)
  const { user } = useStoreState(state => state.session)

  if (user) {
    Router.replace('/home')

    return null
  }

  return (
    <main className="register__main">
      <Head>
        <title>Sign up: Mesenja</title>
      </Head>
      <Logo />
      <FormSignUp className="register__form" onRegister={register} />
    </main>
  )
}

export default Register
