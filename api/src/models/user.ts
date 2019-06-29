import {
  Typegoose,
  InstanceType,
  ModelType,
  Ref,
  arrayProp,
  instanceMethod,
  prop
} from 'typegoose'

import { Team } from './team'

export class User extends Typegoose {
  @prop({ unique: true })
  email: string

  @prop()
  password: string

  @prop()
  name: string

  @arrayProp({ itemsRef: Team })
  teams: Ref<Team>[]

  @prop({ default: new Date() })
  created: Date

  @prop({ default: new Date() })
  updated: Date

  @instanceMethod
  async addTeam(this: InstanceType<User>, team: InstanceType<Team>) {
    this.teams.push(team)

    return this.save()
  }
}

export default new User().getModelForClass(User)
