const { Router } = require("express")
const EngineerProfileModel = require("../models/engineerprofile")
const engineerprofileRouter = Router();

engineerprofileRouter.get("/:userId/profile", async (req, res) => {
    const userId = req.params.userId
    const tasks = await EngineerProfileModel.find({ userId })
    res.send(tasks)
})

engineerprofileRouter.post("/:userId/profile", async (req, res) => {
    const userId = req.params.userId
    const  project = req.body
    let payload = {
        ...project,
        userId
    }
    const task = await new EngineerProfileModel(payload)
    task.save((err, success) => {
        if (err) {
            return res.status(500).send({ message: "something went wrong" })
        }
        return res.status(201).send(success)
    })
})

engineerprofileRouter.delete("/:userId/profile/:id", async (req, res) => {
    console.log('param', req.params)
    await EngineerProfileModel.deleteOne({ _id: req.params.id });
    res.send(`Successfully delete project with id ${req.params.id}`)
})

engineerprofileRouter.patch("/:userId/profile/:id", async (req, res) => {
    // res.send(req.body);
    try {
        await EngineerProfileModel.findOneAndUpdate({ _id: req.params.id }, req.body)
            .lean()
            .exec();
        const task = await EngineerProfileModel.findOne({ _id: req.params.id });
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = engineerprofileRouter;

