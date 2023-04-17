const mongoose = require("mongoose");

const engineerProfileSchema = mongoose.Schema({
    // img: {
    //     data: Buffer,
    //     contentType: String,
    //     require: false
    //     },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true},
    birthDate: { type: String, require: true},
    gender: {type: String, require: true },
    address: { type: String, require: true },
    state: { type: String, require: true },
    country: { type: String, require: true },
    pinCode: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    department : { type: String, require: true },
    designation : { type: String, require: true},
    reportsTo :{type:String, require:true},
    userId: { type: String, require: true },
});

const EngineerProfileModel = mongoose.model("engineerprofile", engineerProfileSchema);

module.exports = EngineerProfileModel;