const db = require("../data/config")

function find() {
    return db("projects")
}

function findById(id) {
    return db("projects").where("id", id)
}

async function insert(project) {
    const [id] = await db("projects").insert(project)
    return db("projects").where("id", id)
}

module.exports = {
    find,
    findById,
    insert
}