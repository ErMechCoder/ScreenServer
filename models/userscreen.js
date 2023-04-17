const mongoose = require("mongoose");

const userScreenSchema = mongoose.Schema({
    type: { type: String, required: true},
    image: { type: String,  required: true},
    uploadedAt: {type: String},
    userId: { type: String, require: true },
});

const UserScreenModel = mongoose.model("UserScreen", userScreenSchema);

module.exports = UserScreenModel;