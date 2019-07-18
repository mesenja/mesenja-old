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
              <th>Name</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {members.map(({ joined, role, user }, index) => (
              <tr key={index}>
                <td className="members__name">
                  <Avatar size="small" user={user} />
                  {user.name}
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
