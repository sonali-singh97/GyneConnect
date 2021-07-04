const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const DoctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    userType: {
        type: String,
        default: "doctor"
    },

    image: {
        type: String,
        default: "https://res.cloudinary.com/talk-amigo/image/upload/v1625387829/GyneConnect/GyneConnect_vzcnxr.jpg"
    },

    startTime: String,
    endTime:String,
    fees: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    gender:String,

    hospitalName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    website:String,

    remarks: String,

    isVerified: {
        type: Boolean,
        default: false
    },

    reviews :[String],
    tags :[String],
    timeSlots:[{ 
        date: Date,
        startTime: String,
        available: {
            type: Boolean,
            default: true
        },
        patientId : {
            type: ObjectId,
            ref: "User"
        }}]
}, {
    timestamps: true
})



module.exports = mongoose.model("Doctor", DoctorSchema)