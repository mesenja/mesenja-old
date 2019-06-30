import Head from 'next/head'
import Router from 'next/router'
import React, { FunctionComponent } from 'react'

import { useStoreState, useStoreActions } from '../store'

import './home.scss'

const Home: FunctionComponent = () => {
  const { team } = useStoreState(state => state.session)
  const { logout } = useStoreActions(state => state.session)

  if (!team) {
    Router.replace('/')
  }

  return (
    <main className="home__main">
      <Head>
        <title>{team && team.name}: Mesenja</title>
      </Head>
      <pre className="home__team">
        <code>{JSON.stringify(team, null, 2)}</code>
      </pre>
      <button onClick={logout}>Logout</button>
    </main>
  )
}

export default Home
