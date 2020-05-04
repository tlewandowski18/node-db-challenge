
exports.seed = async function(knex) {
  await knex("resources").insert([
    {
      name: "vacuum cleaner",
      description: "sucks up dirt"
    },
    {
      name: "rags",
      description: "for wiping things or making forts"
    },
    {
      name: "cleaning spray",
      description: "100% organic cleaner"
    },
    {
      name: "football",
      description: "official size and weight"
    },
    {
      name: "dice",
      description: "six sides"
    },
    {
      name: "books",
      description: "pictures and words"
    }
  ])
};
