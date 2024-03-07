import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type {  BelongsTo} from '@adonisjs/lucid/types/relations'

import User from './user.ts'
import Post from './post.ts'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public userid !: number

  @column()
  public postid !: number

  @column()
  public comment!: string



  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post!: BelongsTo<typeof Post>
}