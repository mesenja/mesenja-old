const comment = (data: any) => ({
  body: data.body,
  id: data.id,
  created: data.created,
  user: {
    id: data.user.id,
    name: data.user.name
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

const member = (data: any) => ({
  joined: data.joined,
  role: data.role,
  user: {
    id: data.user.id,
    name: data.user.name
  }
})

const post = (data, userId) => ({
  body: data.body,
  created: data.created,
  id: data.id,
  liked: data.likes.includes(userId),
  likes: data.likes,
  meta: {
    comments: data.comments.length,
    likes: data.likes.length
  },
  pinned: data.pinned,
  seen: data.seen,
  user: {
    id: data.user.id,
    name: data.user.name
  }
})

const team = (data: any) => ({
  created: data.created,
  id: data.id,
  name: data.name,
  slug: data.slug
})

const user = (data: any) => ({
  created: data.created,
  email: data.email,
  id: data.id,
  name: data.name
})

export default (model: string, data: any) => {
  switch (model) {
    case 'comment':
      return comment(data)

    case 'comments':
      return data.map((item: any) => comment(item))

    case 'feed':
      return feed(data)

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
