import { Ref, Typegoose, prop } from 'typegoose'

import { Team } from './team'
import { User } from './user'

export enum Type {
  TEAM_CREATED = 'team_created',
  USER_JOINED = 'user_joined'
}

export class Feed extends Typegoose {
  @prop({ enum: Type })
  type: Type

  @prop({ ref: Team })
  team: Ref<Team>

  @prop({ ref: User })
  user: Ref<User>

  @prop({ default: new Date() })
  created: Date
}

export default new Feed().getModelForClass(Feed)
