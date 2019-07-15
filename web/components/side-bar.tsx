import './side-bar.scss'

import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

interface Props {
  href: string
  icon: string
}

const NavLink: FunctionComponent<Props> = ({ href, icon }) => {
  const { route } = useRouter()

  return (
    <Link href={href}>
      <a
        className={classNames({
          active: route === href
        })}
      >
        <img src={`/static/img/nav_${icon}.svg`} />
      </a>
    </Link>
  )
}

const SideBar: FunctionComponent = () => {
  return (
    <header className="side-bar">
      <nav>
        <NavLink href="/feed" icon="feed" />
        <NavLink href="/posts" icon="posts" />
        <NavLink href="/messages" icon="messages" />
        <NavLink href="/members" icon="members" />
      </nav>
      <nav>
        <NavLink href="/settings" icon="settings" />
        <NavLink href="/logout" icon="logout" />
      </nav>
    </header>
  )
}

export default SideBar
