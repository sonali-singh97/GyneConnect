const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DoctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
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

DoctorSchema.methods.verifyPassword = async (inputPassword) => {
   return bcrypt.compare(inputPassword, this.password);
    console.log(data)
    return data;
}

module.exports = mongoose.model("Doctor", DoctorSchema)