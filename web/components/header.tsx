import React, { FunctionComponent } from 'react'

import './header.scss'

interface Props {
  className?: string
}

const Header: FunctionComponent<Props> = ({ className }) => {
  return (
    <header className={`header__main ${className}`}>
      <img className="header__mesenja" src="/static/img/mesenja.svg" />
      <h1>Mesenja</h1>
    </header>
  )
}

export default Header
