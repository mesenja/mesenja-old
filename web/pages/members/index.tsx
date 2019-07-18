import './index.scss'

import { capitalize } from 'lodash'
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
        <table>
          <thead>
            <tr>
              <th className="members__name">Name</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {members.map(({ joined, role, user }, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/members/${user.id}`}>
                    <a className="members__member">
                      <Avatar className="members__member__avatar" user={user} />
                      <span className="members__member__name">{user.name}</span>
                    </a>
                  </Link>
                </td>
                <td>{capitalize(role)}</td>
                <td>{moment(joined).fromNow()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
