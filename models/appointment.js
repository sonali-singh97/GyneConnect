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
    day:{
      type: Date,
      required: true
    },

    time: {
        type: String,
        required: true,
    },

    duration: {
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
