import Head from 'next/head'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { Logo } from '../components'
import { Main } from '../layouts'

import './index.scss'

const Index: FunctionComponent = () => {
  return (
    <Main className="index__main">
      <Head>
        <title>Mesenja</title>
      </Head>
      <Logo className="index__logo" />
      <main>
        <p>Mesenja helps you communicate with your team better</p>
        <footer>
          <Link href="/register">
            <button>Get started</button>
          </Link>
          <Link href="/login">
            <a className="index__login">Login</a>
          </Link>
        </footer>
      </main>
    </Main>
  )
}

export default Index
