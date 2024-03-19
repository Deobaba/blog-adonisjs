import { DateTime } from 'luxon'
import { BaseModel, column,  hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Review from './review.ts'
import Post from './post.ts'
import Comment from './comment.ts'

// Remove the unused import statement for Hash
// import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number


  @column()
  public username!: string

  @column()
  public email!: string

  @column ({serializeAs: null})
  public password!: string

  @column()
  public age!: number

  @column()
  public rememberMeToken?: string | null

  @column()
  public rememberMeTokenExpireAt?: DateTime | null


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Review)
  public reviews!: HasMany<typeof Review>

  @hasMany(() => Post)
  public posts!: HasMany<typeof Post>

  @hasMany(() => Comment)
  public comments!: HasMany<typeof Comment>
    user: Date

  // @beforeSave()
  // public static async hashPassword (user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await Hash.make(user.password)
  //   }
}


