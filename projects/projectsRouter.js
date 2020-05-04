const express = require("express")
const projectsDb = require("./projectsModel")
const tasksRouter = require("../tasks/tasksRouter")

const router = express.Router()

router.use("/:id/tasks", tasksRouter)

router.post("/", validateReqBody(), async (req, res, next) => {
    try {
        const newProject = await projectsDb.insert(req.body)
        res.status(201).json(newProject)
    } catch(err) {
        next(err)
    }
})
router.get("/", async (req, res, next) => {
    try {
        res.json(await projectsDb.find())
    } catch(err) {
        next(err)
    }
})

function validateReqBody() {
    return (req, res, next) => {
        if (!req.body.name) {
            res.status(400).json({
                message: "Please provide project name"
            })
        } 
        next()
    }
}

module.exports = router