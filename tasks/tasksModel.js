const db = require("../data/config")

function find(projectId) {
    return db("tasks as t")
        .join("projects as p", "p.id", "t.project_id")
        .where("p.id", projectId)
        .select("t.id", "t.description", "t.notes", "t.completed", "p.name as project_name")
}

async function insert(task) {
    const [id] = await db("tasks").insert(task)
    return db("tasks").where("id", id)
}

module.exports = {
    find,
    insert
}