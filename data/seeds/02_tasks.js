
exports.seed = async function(knex) {
  await knex("tasks").insert([
    {
      description: "vacuum", 
      notes: "every room", 
      project_id: 1
    },
    {
      description: "clean windows", 
      notes: "birds should be crashing into them",
      project_id: 1
    },
    {
      description: "Read four books",
      notes: "Let kids pick the books",
      project_id: 2
    },
    {
      description: "Play 2 Inside Games and 2 Outside Games",
      notes: "total 1 hour",
      project_id: 2
    }
  ])
};
