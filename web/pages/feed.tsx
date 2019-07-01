import Head from 'next/head'
import React, { FunctionComponent } from 'react'

import { SideBar } from '../components'
import { Main } from '../layouts'
import { useStoreState } from '../store'

import './feed.scss'

const Feed: FunctionComponent = () => {
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
