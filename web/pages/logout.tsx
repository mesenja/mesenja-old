import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import { useStoreActions } from '../store'

import './login.scss'

const Logout: FunctionComponent = () => {
  const { logout } = useStoreActions(actions => actions.session)

  const { replace } = useRouter()

  logout()

  replace('/')

  return null
}

export default Logout
