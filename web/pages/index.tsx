import Head from 'next/head'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { Header } from '../components'

import './index.scss'

const Index: FunctionComponent = () => {
  return (
    <main className="index__main">
      <Head>
        <title>Mesenja</title>
      </Head>
      <Header className="index__header" />
      <main>
        <p>Mesenja helps you communicate with your team better</p>
        <Link href="/register">
          <button>Get started</button>
        </Link>
      </main>
    </main>
  )
}

export default Index
