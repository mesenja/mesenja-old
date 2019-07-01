import Head from 'next/head'
import React, { FunctionComponent } from 'react'

import { FormRegister, Logo } from '../components'
import { Main } from '../layouts'
import { useStoreActions } from '../store'

import './register.scss'

const Register: FunctionComponent = () => {
  const { register } = useStoreActions(actions => actions.session)

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
