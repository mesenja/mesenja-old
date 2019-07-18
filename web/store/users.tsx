export interface User {
  created: string
  email: string
  id: string
  name: string
}

export interface RegisterProps {
  email: string
  name: string
  password: string
  teamName: string
}

export interface LoginProps {
  email: string
  password: string
}
