import './avatar.scss'

import Identicon from 'identicon.js'
import React, { FunctionComponent } from 'react'

import { User } from '../store/users'

interface Props {
  className?: string
  size?: 'regular' | 'small'
  user: string | User
}

const Avatar: FunctionComponent<Props> = ({
  className,
  size = 'regular',
  user
}) => {
  const id = typeof user === 'string' ? user : user.id

  const avatar = new Identicon(id, {
    format: 'svg',
    margin: 0,
    size: 200
  }).toString()

  return (
    <img
      className={`avatar ${className} avatar__${size}`}
      src={`data:image/svg+xml;base64,${avatar}`}
    />
  )
}

export default Avatar
