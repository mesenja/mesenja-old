import session, { SessionModel } from './session'

export interface StoreModel {
  session: SessionModel
}

const model: StoreModel = {
  session
}

export default model
