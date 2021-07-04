const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;

const TimeSlotSchema =  new mongoose.Schema({
    date: Date,
    startTime: String,
    available: {
        type: Boolean,
        default: true
    },
    patientId : {
        type: ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("TimeSlot", TimeSlotSchema)