import './post.scss'

import moment from 'moment'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { Post as IPost } from '../store/posts'
import Avatar from './avatar'
import Body from './body'

interface Props {
  className?: string
  post: IPost
}

const Post: FunctionComponent<Props> = ({
  className,
  post: {
    body,
    created,
    id,
    user,
    meta: { comments, likes }
  }
}) => {
  return (
    <article className={`post ${className}`}>
      <header className="post__header">
        <Link href={`/members/${user.id}`}>
          <a className="post__header__link">
            <Avatar size="small" user={user} />
            <h4 className="post__header__link__name">{user.name}</h4>
          </a>
        </Link>
        <aside className="post__header__meta">
          {moment(created).fromNow(true)}
        </aside>
      </header>
      <Body className="post__body" body={body} />
      <footer className="post__footer">
        <Link href={`/posts/${id}`}>
          <a className="post__footer__likes">{likes}</a>
        </Link>
        <Link href={`/posts/${id}`}>
          <a className="post__footer__comments">{comments}</a>
        </Link>
      </footer>
    </article>
  )
}

export default Post
