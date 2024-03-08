import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE')
      table.integer('rating').notNullable().defaultTo(5)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

  //   await this.schema.raw(`
  //   ALTER TABLE ${this.tableName}
  //   ADD CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 10)
  // `)

  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}