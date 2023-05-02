import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("links", (table) => {
    table.increments("id").primary();
    table.text("url").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("links");
}
