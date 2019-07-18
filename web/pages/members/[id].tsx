import './[id].scss'

import { capitalize } from 'lodash'
import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

import { Avatar, Post, SideBar } from '../../components'
import { Main } from '../../layouts'
import { api } from '../../services'
import { useStoreState } from '../../store'

const Member: NextPage = () => {
  const {
    query: { id }
  } = useRouter()

  const { team } = useStoreState(state => state.session)
  const { members } = useStoreState(state => state.members)

  const member = members.find(member => member.user.id === id)

  if (!member) {
    return <div>not found</div>
  }

  const { joined, posts, role, user } = member

  return (
    <Main>
      <SideBar />
      <main className="member__main">
        <Head>
          <title>
            {user.name}: {team.name}: Mesenja
          </title>
        </Head>
        <header className="member__header">
          <Avatar className="member__header__avatar" user={user} />
          <section className="member__header__details">
            <h1 className="member__header__details__name">{user.name}</h1>
            <span className="member__header__details__meta">
              {capitalize(role)}
              &#160;Joined {moment(joined).fromNow()}
            </span>
          </section>
        </header>
        {posts && posts.length > 0 && (
          <Fragment>
            <h2>Recent posts</h2>
            <section className="member__posts">
              {posts.map((post, index) => (
                <Post key={index} className="member__posts__post" post={post} />
              ))}
            </section>
          </Fragment>
        )}
        {(!posts || posts.length === 0) && <h2>No recent posts yet.</h2>}
      </main>
    </Main>
  )
}

Member.getInitialProps = async ({ query: { id } }) => {
  const { member, posts } = await api.member(id as string)

  return {
    members: {
      members: [
        {
          ...member,
          posts
        }
      ]
    }
  }
}

export default Member
