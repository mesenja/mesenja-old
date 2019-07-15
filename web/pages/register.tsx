import './register.scss'

import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { FormRegister, Logo } from '../components'
import { Main } from '../layouts'
import { useStoreActions } from '../store'

const Register: NextPage = () => {
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
