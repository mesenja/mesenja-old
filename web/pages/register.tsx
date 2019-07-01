import Head from 'next/head'
import Router from 'next/router'
import React, { FunctionComponent } from 'react'

import { FormRegister, Logo } from '../components'
import { Main } from '../layouts'
import { useStoreActions, useStoreState } from '../store'

import './register.scss'

const Register: FunctionComponent = () => {
  const { register } = useStoreActions(actions => actions.session)
  const { user } = useStoreState(state => state.session)

  if (user) {
    Router.replace('/home')

    return null
  }

  return (
    <Main className="register__main">
      <Head>
        <title>Sign up: Mesenja</title>
      </Head>
      <Logo />
      <FormRegister className="register__form" onRegister={register} />
    </Main>
  )
}

export default Register
