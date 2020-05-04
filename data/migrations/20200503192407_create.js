
exports.up = async function(knex) {
  await knex.schema.createTable("projects", table => {
      table.increments("id")
      table.text("name").notNull()
      table.text("description")
      table.boolean("completed").defaultTo(false)
  })
  await knex.schema.createTable("tasks", table => {
      table.increments("id")
      table.text("description").notNull()
      table.text("notes")
      table.integer("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("SET NULL")
        .notNull()
      table.boolean("completed").defaultTo(false)
  })
  await knex.schema.createTable("resources", table => {
      table.increments("id")
      table.text("name").notNull()
      table.text("description")
  })
  await knex.schema.createTable("projects_resources", table => {
      table.integer("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("SET NULL")
      table.integer("resource_id")
        .references("id")
        .inTable("resources")
        .onDelete("SET NULL")
      table.primary(["project_id", "resource_id"])
  })


};

exports.down = async function(knex) {
    await knex.schema.dropTable("projects_resources")
    await knex.schema.dropTable("resources")
    await knex.schema.dropTable("tasks")
    await knex.schema.dropTable("projects")
};
