import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from 'react'

interface Props {
  className?: string

  onLogin(user: { email: string; password: string }): void
}

const FormLogin: FunctionComponent<Props> = ({ className, onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const update = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const {
      target: { value }
    } = event

    switch (key) {
      case 'email':
        setEmail(value)
        break

      case 'password':
        setPassword(value)
        break
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()

    onLogin({
      email,
      password
    })
  }

  return (
    <form className={className} onSubmit={submit}>
      <label>
        <input
          onChange={event => update(event, 'email')}
          placeholder="Email"
          required
          type="email"
          value={email}
        />
      </label>
      <label>
        <input
          onChange={event => update(event, 'password')}
          placeholder="Password"
          required
          type="password"
          value={password}
        />
      </label>
      <button>Login</button>
    </form>
  )
}

export default FormLogin
