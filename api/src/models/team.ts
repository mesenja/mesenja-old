import { kebabCase } from 'lodash'
import {
  InstanceType,
  ModelType,
  Ref,
  Typegoose,
  arrayProp,
  instanceMethod,
  prop,
  staticMethod
} from 'typegoose'

import UserModel, { User } from './user'

export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member'
}

export class Member extends Typegoose {
  @prop({ ref: User })
  user: Ref<User>

  @prop({ enum: Role })
  role: Role

  @prop({ default: new Date() })
  joined: Date
}

const MemberModel = new Member().getModelForClass(Member)

export class Team extends Typegoose {
  @prop({ unique: true })
  slug: string

  @prop()
  name: string

  @arrayProp({ items: Member })
  members: Member[]

  @prop({ default: new Date() })
  created: Date

  @instanceMethod
  async addMember(
    this: InstanceType<Team>,
    userId: InstanceType<User>,
    role: Role
  ) {
    const member = new MemberModel({
      role,
      user: userId
    })

    this.members.push(member)

    await this.save()

    await UserModel.findByIdAndUpdate(userId, {
      team: this.id
    })
  }

  @instanceMethod
  isMember(this: InstanceType<Team>, userId: InstanceType<User>) {
    return Boolean(
      this.members.find(({ user }) =>
        // @ts-ignore
        user.equals(userId)
      )
    )
  }

  @staticMethod
  static async createNew(
    this: ModelType<Team>,
    teamName: string,
    name: string,
    email: string,
    password: string
  ) {
    const team = new this({
      name: teamName,
      slug: kebabCase(teamName)
    })

    const user = await UserModel.createNew(name, email, password, team.id)

    const member = new MemberModel({
      role: Role.OWNER,
      user: user.id
    })

    team.members.push(member)

    await team.save()

    return {
      team,
      user
    }
  }
}

export default new Team().getModelForClass(Team)
