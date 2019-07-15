import './avatar.scss'

import Identicon from 'identicon.js'
import React, { FunctionComponent } from 'react'

import { User } from '../store/session'

interface Props {
  className?: string
  user: string | User
}

const Avatar: FunctionComponent<Props> = ({ className, user }) => {
  const id = typeof user === 'string' ? user : user.id

  const avatar = new Identicon(id, {
    format: 'svg',
    margin: 0,
    size: 200
  }).toString()

  return <img className="avatar" src={`data:image/svg+xml;base64,${avatar}`} />
}

export default Avatar
