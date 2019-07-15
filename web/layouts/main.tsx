import './main.scss'

import React, { FunctionComponent } from 'react'

interface Props {
  className?: string
}

const Main: FunctionComponent<Props> = ({ children, className }) => {
  return <div className={`layout__main ${className}`}>{children}</div>
}

export default Main
