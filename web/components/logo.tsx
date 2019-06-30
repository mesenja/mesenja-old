import React, { FunctionComponent } from 'react'

import './logo.scss'

interface Props {
  className?: string
}

const Logo: FunctionComponent<Props> = ({ className }) => {
  return (
    <header className={`logo__main ${className}`}>
      <img className="logo__mesenja" src="/static/img/mesenja.svg" />
      <h1>Mesenja</h1>
    </header>
  )
}

export default Logo
