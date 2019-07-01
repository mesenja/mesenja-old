import React, { FunctionComponent } from 'react'

import './main.scss'

interface Props {
  className?: string
}

const Main: FunctionComponent<Props> = ({ children, className }) => {
  return <div className={`layout__main ${className}`}>{children}</div>
}

export default Main
