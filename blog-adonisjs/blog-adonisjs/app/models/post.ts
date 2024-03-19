import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo, hasMany} from '@adonisjs/lucid/orm'
import type { HasMany , BelongsTo} from '@adonisjs/lucid/types/relations'

import User from './user.ts'
import Comment from './comment.ts'
import Review from './review.ts'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public userId !: number

  @column()
  public title!: string

  @column()
  public content!: string

  @column()
  public isPublished!: boolean

  @column()
  public views!: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments!: HasMany<typeof Comment>

  @hasMany(() => Review)
  public reviews!: HasMany<typeof Review>
 
}