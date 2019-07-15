import './index.scss'

import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { Avatar, SideBar } from '../../components'
import { Main } from '../../layouts'
import { api } from '../../services'
import { useStoreState } from '../../store'

const Members: NextPage = () => {
  const { team } = useStoreState(state => state.session)
  const { members } = useStoreState(state => state.members)

  return (
    <Main>
      <SideBar />
      <main className="members__main">
        <Head>
          <title>Members: {team.name}: Mesenja</title>
        </Head>
        <h1>Members</h1>
        <section>
          {members.map((member, index) => (
            <article key={index} className="members__item">
              <Avatar user={member.user} />
              <div className="members__details">
                <Link href={`/members/${member.user.id}`}>
                  <a>{member.user.name}</a>
                </Link>
                <span className="members__joined">
                  Joined {moment(member.joined).fromNow()}
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </Main>
  )
}

Members.getInitialProps = async () => {
  const { members } = await api.members()

  return {
    members: {
      members
    }
  }
}

export default Members
