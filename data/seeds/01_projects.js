
exports.seed = async function(knex) {
  await knex("projects").insert([
    {name: "Clean House", description: "Make this place spotless"},
    {name: "Entertain Kids", description: "Read and Play Games"}
  ])
};
