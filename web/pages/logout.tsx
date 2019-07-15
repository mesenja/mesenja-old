import './login.scss'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useStoreActions } from '../store'

const Logout: NextPage = () => {
  const { logout } = useStoreActions(actions => actions.session)

  const { replace } = useRouter()

  logout()

  replace('/')

  return null
}

export default Logout
