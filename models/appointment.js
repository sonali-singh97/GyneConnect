const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Doctor",
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Appointment", AppointmentSchema)
