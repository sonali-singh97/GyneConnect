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
    officeHours: String,
    fees: String,
    email: String,
    password: {
        type: String,
    },

    gender:String,

    hospitalName: {
        type: String,
    },
    location: {
        type: String,
    },
    address: {
        type: String,
    },

    phone: {
        type: String,
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