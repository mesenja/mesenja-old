import feed, { FeedModel } from './feed'
import members, { MembersModel } from './members'
import session, { SessionModel } from './session'

export interface StoreModel {
  feed: FeedModel
  members: MembersModel
  session: SessionModel
}

const model: StoreModel = {
  feed,
  members,
  session
}

export default model
