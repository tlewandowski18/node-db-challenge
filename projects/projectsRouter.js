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

router.get("/:id", validateProjectId(), async (req, res, next) => {
    try {
        res.json(req.project)
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

function validateProjectId() {
    return async (req, res, next) => {
        try {
            const project = await projectsDb.getById(req.params.id)
            if (project.length === 0) {
                return res.status(404).json({
                    message: "Could not find project"
                })
            } else {
                req.project = project
                next() 
            }
        } catch(err){
            next(err)
        }
    }
}

module.exports = router