const express = require("express")
const tasksDb = require("./tasksModel")
const projectsDb = require("../projects/projectsModel")

const router = express.Router({
    mergeParams: true
})

router.post("/", validateReqBody(), validateProjectId(), async (req, res, next) => {
    try {
        const newTask = await tasksDb.insert(req.body)
        res.status(201).json(newTask)
    } catch(err) {
        next(err)
    }
})
router.get("/", validateProjectId(), async (req, res, next) => {
    try {
        res.json(await tasksDb.find(req.params.id))
    } catch(err) {
        next(err)
    }
})

function validateReqBody() {
    return (req, res, next) => {
        if (!req.body.description) {
            res.status(400).json({
                message: "Please provide task description"
            })
        } else if (!req.body.project_id) {
            res.status(400).json({
                message: "Please provide project id"
            })
        }
        next()
    }
}

function validateProjectId() {
    return async (req, res, next) => {
        try {
            const project = await projectsDb.findById(req.params.id)
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