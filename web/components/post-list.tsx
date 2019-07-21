import './post-list.scss'

import { last } from 'lodash'
import React, { FunctionComponent } from 'react'

import { useStoreActions, useStoreState } from '../store'
import { Post as IPost } from '../store/posts'
import Post from './post'

interface Props {
  posts: IPost[]
  title: string
}

const PostList: FunctionComponent<Props> = ({ posts, title }) => {
  const { loading } = useStoreState(state => state.posts)
  const { fetch } = useStoreActions(state => state.posts)

  return (
    <section className="postList">
      <h2 className={`postList__title ${title.toLowerCase()}`}>{title}</h2>
      <section className="postList__posts">
        {posts.map((post, index) => (
          <Post key={index} className="postList__posts__posts" post={post} />
        ))}
        <button
          className={`postList__posts__more ${loading ? 'loading' : ''}`}
          onClick={() =>
            fetch({
              before: last(posts).created
            })
          }
        >
          Load more
        </button>
      </section>
    </section>
  )
}

export default PostList
