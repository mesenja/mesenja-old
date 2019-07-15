import { compare, hash } from 'bcrypt'
import {
  InstanceType,
  ModelType,
  Ref,
  Typegoose,
  prop,
  staticMethod
} from 'typegoose'

import TeamModel, { Team } from './team'

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

  @staticMethod
  static async createNew(
    this: ModelType<User>,
    name: string,
    email: string,
    password: string,
    team: InstanceType<Team>
  ) {
    const user = await this.create({
      email,
      name,
      team,
      password: await hash(password, 10)
    })

    return user
  }

  @staticMethod
  static async login(this: ModelType<User>, email: string, password: string) {
    const user = await this.findOne({
      email
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (!(await compare(password, user.password))) {
      throw new Error('Invalid password')
    }

    const team = await TeamModel.findById(user.team)

    if (!team) {
      throw new Error('Team not found')
    }

    return {
      team,
      user
    }
  }
}

export default new User().getModelForClass(User)
