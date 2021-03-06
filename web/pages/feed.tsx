import './feed.scss'

import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { Avatar, SideBar } from '../components'
import { Main } from '../layouts'
import { api } from '../services'
import { useStoreState } from '../store'
import { Feed as IFeed } from '../store/feed'

const copy = (feed: IFeed) => {
  switch (feed.type) {
    case 'team_created':
      return (
        <Fragment>
          <Link href={`/members/${feed.user.id}`}>
            <a>{feed.user.name}</a>
          </Link>
          &#160;created {feed.team.name}.
        </Fragment>
      )

    case 'user_joined':
      return (
        <Fragment>
          <Link href={`/members/${feed.user.id}`}>
            <a>{feed.user.name}</a>
          </Link>
          &#160;joined {feed.team.name}.
        </Fragment>
      )
  }
}

const Feed: NextPage = () => {
  const { team } = useStoreState(state => state.session)
  const { feed } = useStoreState(state => state.feed)

  return (
    <Main>
      <SideBar />
      <main className="feed__main">
        <Head>
          <title>Feed: {team.name}: Mesenja</title>
        </Head>
        <h1>Feed</h1>
        <section>
          {feed.map((feed, index) => (
            <article key={index} className="feed__item">
              <Avatar user={feed.user} />
              <div className="feed__details">
                <p className="feed__copy">{copy(feed)}</p>
                <span className="feed__joined">
                  {moment(feed.created).fromNow()}
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </Main>
  )
}

Feed.getInitialProps = async () => {
  const { feed } = await api.feed()

  return {
    feed: {
      feed
    }
  }
}

export default Feed
