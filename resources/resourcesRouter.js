const express = require("express")
const resourcesDb = require("./resourcesModel")

const router = express.Router()

router.post("/", validateReqBody(), async (req, res, next) => {
    try {
        const newResource = await resourcesDb.insert(req.body)
        res.status(201).json(newResource)
    } catch(err) {
        next(err)
    }
})
router.get("/", async (req, res, next) => {
    try {
        res.json(await resourcesDb.find())
    } catch(err) {
        next(err)
    }
})

function validateReqBody() {
    return (req, res, next) => {
        if (!req.body.name) {
            res.status(400).json({
                message: "Please provide resource name"
            })
        } 
        next()
    }
}

module.exports = router