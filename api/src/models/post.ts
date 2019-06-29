import {
  Typegoose,
  InstanceType,
  Ref,
  arrayProp,
  instanceMethod,
  prop
} from 'typegoose'

import { Team } from './team'
import { User } from './user'

export class Attachment extends Typegoose {
  @prop()
  caption?: string

  @prop()
  type: string

  @prop()
  url: string

  @prop({ default: new Date() })
  created: Date
}

export class Comment extends Typegoose {
  @prop()
  body: string

  @prop()
  user: Ref<User>

  @prop({ default: new Date() })
  created: Date

  @prop({ default: new Date() })
  updated: Date
}

const CommentModel = new Comment().getModelForClass(Comment)

export class Post extends Typegoose {
  @prop()
  body: string

  @prop({ default: false })
  pinned: boolean

  @arrayProp({ items: Attachment })
  attachments: Attachment[]

  @arrayProp({ items: Comment })
  comments: Comment[]

  @arrayProp({ itemsRef: User })
  likes: Ref<User>[]

  @arrayProp({ itemsRef: User })
  tagged: Ref<User>[]

  @arrayProp({ itemsRef: User })
  seen: Ref<User>[]

  @prop()
  team: Ref<Team>

  @prop()
  user: Ref<User>

  @prop({ default: new Date() })
  created: Date

  @prop({ default: new Date() })
  updated: Date

  @instanceMethod
  addLike(this: InstanceType<Post>, userId: InstanceType<User>) {
    this.likes.push(userId)
  }

  @instanceMethod
  addSeen(this: InstanceType<Post>, userId: InstanceType<User>) {
    this.seen.push(userId)
  }

  @instanceMethod
  addComment(
    this: InstanceType<Post>,
    userId: InstanceType<User>,
    body: string
  ) {
    const comment = new CommentModel({
      body,
      user: userId
    })

    this.comments.push(comment)

    return comment
  }
}

export default new Post().getModelForClass(Post)
