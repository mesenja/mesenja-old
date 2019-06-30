import React, {
  FunctionComponent,
  ChangeEvent,
  FormEvent,
  useState
} from 'react'

interface Props {
  className?: string

  onRegister(user: {
    name: string
    email: string
    password: string
    teamName: string
  }): void
}

const SignUpForm: FunctionComponent<Props> = ({ className, onRegister }) => {
  const [name, setName] = useState('Ali Zahid')
  const [email, setEmail] = useState('ali.zahid@live.com')
  const [password, setPassword] = useState('test1234')
  const [teamName, setTeamName] = useState('Mesenja')

  const update = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const {
      target: { value }
    } = event

    switch (key) {
      case 'name':
        setName(value)
        break

      case 'email':
        setEmail(value)
        break

      case 'password':
        setPassword(value)
        break

      case 'teamName':
        setTeamName(value)
        break
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()

    onRegister({
      name,
      email,
      password,
      teamName
    })
  }

  return (
    <form className={className} onSubmit={submit}>
      <label>
        <input
          onChange={event => update(event, 'name')}
          placeholder="Your name"
          required
          value={name}
        />
      </label>
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
      <label>
        <input
          onChange={event => update(event, 'teamName')}
          placeholder="Team name"
          required
          value={teamName}
        />
      </label>
      <button>Create</button>
    </form>
  )
}

export default SignUpForm
