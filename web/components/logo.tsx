import './logo.scss'

import React, { FunctionComponent } from 'react'

interface Props {
  className?: string
}

const Logo: FunctionComponent<Props> = ({ className }) => {
  return (
    <header className={`logo__main ${className}`}>
      <img className="logo__mesenja" src="/static/img/mesenja.svg" />
      <h1 className="logo__name">Mesenja</h1>
    </header>
  )
}

export default Logo
