const comment = ({ body, created, id, user }: any) => ({
  body,
  created,
  id,
  user: {
    id: user.id,
    name: user.name
  }
})

const feed = (data: any) =>
  data.map(({ created, id, team, type, user }) => ({
    created,
    id,
    type,
    team: {
      id: team.id,
      name: team.name
    },
    user: {
      id: user.id,
      name: user.name
    }
  }))

const member = ({ joined, role, user }: any) => ({
  joined,
  role,
  user: {
    id: user.id,
    name: user.name
  }
})

const post = (
  { body, comments, created, id, likes, pinned, seen, user }: any,
  userId: any
) => ({
  body,
  created,
  id,
  likes,
  pinned,
  seen,
  liked: likes.includes(userId),
  meta: {
    comments: comments.length,
    likes: likes.length
  },
  user: {
    id: user.id,
    name: user.name
  }
})

const team = ({ created, id, name, slug }: any) => ({
  created,
  id,
  name,
  slug
})

const user = ({ created, email, id, name }: any) => ({
  created,
  email,
  id,
  name
})

export default (model: string, data: any) => {
  switch (model) {
    case 'comment':
      return comment(data)

    case 'comments':
      return data.map((item: any) => comment(item))

    case 'feed':
      return feed(data)

    case 'member':
      return {
        member: member(data.member),
        posts: data.posts.map((item: any) => post(item, data.userId))
      }

    case 'members':
      return data.map((item: any) => member(item))

    case 'post':
      return post(data.post, data.userId)

    case 'posts':
      return data.posts.map((item: any) => post(item, data.userId))

    case 'team':
      return team(data)

    case 'user':
      return user(data)
  }
}
