import Linkify from 'linkifyjs/react'
import React, { FunctionComponent } from 'react'

interface Props {
  className?: string
  body: string
}

const Body: FunctionComponent<Props> = ({ className, body }) => {
  return (
    <div className={className}>
      {body
        .split('\n')
        .filter(Boolean)
        .map((text, index) => (
          <p key={index}>
            <Linkify
              options={{
                target: '_blank'
              }}
            >
              {text}
            </Linkify>
          </p>
        ))}
    </div>
  )
}

export default Body
