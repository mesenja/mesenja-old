import './index.scss'

import { difference } from 'lodash'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { PostList, SideBar } from '../../components'
import { Main } from '../../layouts'
import { api } from '../../services'
import { useStoreState } from '../../store'

const Posts: NextPage = () => {
  const { team, user } = useStoreState(state => state.session)
  const { posts } = useStoreState(state => state.posts)

  const mine = posts.filter(post => post.user.id === user.id)
  const pinned = posts.filter(post => post.pinned)
  const tagged = posts.filter(post => post.tagged.includes(user.id))
  const all = difference(posts, [...mine, ...pinned, ...tagged])

  return (
    <Main>
      <Head>
        <title>Posts: {team.name}: Mesenja</title>
      </Head>
      <SideBar />
      <main className="posts__main">
        {all.length > 0 && <PostList posts={all} title="All" />}
        {pinned.length > 0 && <PostList posts={pinned} title="Pinned" />}
        {tagged.length > 0 && <PostList posts={tagged} title="Tagged" />}
        {mine.length > 0 && <PostList posts={mine} title="Mine" />}
      </main>
    </Main>
  )
}

Posts.getInitialProps = async () => {
  const { posts } = await api.posts()

  return {
    posts: {
      posts
    }
  }
}

export default Posts
