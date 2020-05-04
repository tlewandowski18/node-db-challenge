const db = require("../data/config")

function find() {
    return db("resources")
}

function findById(id) {
    return db("resources").where("id", id)
}

async function insert(resource) {
    const [id] = await db("resources").insert(resource)
    return db("resources").where("id", id)
}

module.exports = {
    find,
    findById,
    insert
}