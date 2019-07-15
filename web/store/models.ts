import feed, { FeedModel } from './feed'
import session, { SessionModel } from './session'

export interface StoreModel {
  feed: FeedModel
  session: SessionModel
}

const model: StoreModel = {
  feed,
  session
}

export default model
