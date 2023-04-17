const { Router } = require("express")
const ProjectTaskModel = require("../models/project")
const projectRouter = Router();

projectRouter.get("/:userId/projects", async (req, res) => {
    const userId = req.params.userId
    const tasks = await ProjectTaskModel .find({ userId })
    res.send(tasks)
})

projectRouter.post("/:userId/projects", async (req, res) => {
    const userId = req.params.userId
    const  project = req.body

    console.log(project)

    let payload = {
        ...project,
        userId
    }
    const task = await new ProjectTaskModel (payload)
    task.save((err, success) => {
        if (err) {
            return res.status(500).send({ message: "something went wrong" })
        }
        return res.status(201).send(success)
    })

    

})

projectRouter.delete("/:userId/projects/:id", async (req, res) => {
    console.log('param', req.params)
    await ProjectTaskModel .deleteOne({ _id: req.params.id });
    res.send(`Successfully delete project with id ${req.params.id}`)
})

projectRouter.patch("/:userId/projects/:id", async (req, res) => {
    // res.send(req.body);
    try {
        await ProjectTaskModel .findOneAndUpdate({ _id: req.params.id }, req.body)
            .lean()
            .exec();
        const task = await ProjectTaskModel .findOne({ _id: req.params.id });
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = projectRouter;

