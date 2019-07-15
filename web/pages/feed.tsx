import './feed.scss'

import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { SideBar } from '../components'
import { Main } from '../layouts'
import { useStoreState } from '../store'

const Feed: NextPage = () => {
  const { team } = useStoreState(state => state.session)

  return (
    <Main>
      <SideBar />
      <main className="feed__main">
        <Head>
          <title>{team && team.name}: Mesenja</title>
        </Head>
        <pre className="feed__team">
          <code>{JSON.stringify(team, null, 2)}</code>
        </pre>
      </main>
    </Main>
  )
}

export default Feed
