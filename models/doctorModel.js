import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DoctorSchema = new mongoose.Schema({
    fullname :{
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : {
        type: String,
    },
    location:{
        type: String,
        required: true
    },

    phone :{
        type: String,
        required: true
    },

    password:{
      type: String,
      required: true
    }
},
{
    timestamps: true
})

DoctorSchema.methods.verifyPassword = async (inputPassword) => {
return await bcrypt.compare(inputPassword, this.password);
}


const doctor = mongoose.model("Doctor", DoctorSchema)

module.exports = doctor