import {
  Typegoose,
  InstanceType,
  Ref,
  arrayProp,
  prop,
  instanceMethod
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
    role: string
  ) {
    const member = new MemberModel({
      role,
      user: userId
    })

    this.members.push(member)

    await this.save()

    const user = await UserModel.findById(userId)

    await user.addTeam(this)
  }

  @instanceMethod
  isMember(this: InstanceType<Team>, userId: InstanceType<User>) {
    return Boolean(this.members.find(({ user }) => user === userId))
  }
}

export default new Team().getModelForClass(Team)
