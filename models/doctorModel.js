const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    userType: {
     type: String,
     default: "doctor"
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    hospitalName :{
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
    website: {
        type: String,
    },

    remarks: {
        type: String
    },
    isVerified : {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
})



module.exports = mongoose.model("Doctor", DoctorSchema)