import Head from 'next/head'
import React, { FunctionComponent } from 'react'

import { useStoreState } from '../store'

import './home.scss'

const Home: FunctionComponent = () => {
  const { team } = useStoreState(state => state.session)

  return (
    <main className="home__main">
      <Head>
        <title>{team && team.name}: Mesenja</title>
      </Head>
      <pre>{JSON.stringify(team, null, 2)}</pre>
    </main>
  )
}

export default Home
