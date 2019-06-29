import { Typegoose, Ref, prop } from 'typegoose'

import { Team } from './team'

export class User extends Typegoose {
  @prop()
  email: string

  @prop()
  password: string

  @prop()
  name: string

  @prop({ ref: Team })
  team: Ref<Team>

  @prop({ default: new Date() })
  created: Date

  @prop({ default: new Date() })
  updated: Date
}

export default new User().getModelForClass(User)
