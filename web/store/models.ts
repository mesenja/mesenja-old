import feed, { FeedModel } from './feed'
import members, { MembersModel } from './members'
import posts, { PostsModel } from './posts'
import session, { SessionModel } from './session'

export interface StoreModel {
  feed: FeedModel
  members: MembersModel
  posts: PostsModel
  session: SessionModel
}

const model: StoreModel = {
  feed,
  members,
  posts,
  session
}

export default model
