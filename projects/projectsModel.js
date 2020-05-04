const db = require("../data/config")


function find() {
    return db("projects ")
}

function findById(id) {
    return db("projects").where("id", id)
}

async function getById(id) {
    const project = await db("projects").where("id", id).first()
    project.completed === 0 ? project.completed = false : project.completed = true
    const tasks = await db("tasks")
        .where("project_id", id)
    const newTasks = tasks.map(task => {
        task.completed === 0 ? task.completed = false : task.completed = true
        return task
    })
    project.tasks = newTasks
    project.resources = await db("projects as p")
        .join("projects_resources as pr", "p.id", "pr.project_id")
        .join("resources as r", "r.id", "pr.resource_id")
        .where("p.id", id)
        .select("r.*")
    return project
}

async function insert(project) {
    const [id] = await db("projects").insert(project)
    return db("projects").where("id", id)
}

module.exports = {
    find,
    findById,
    insert,
    getById
}