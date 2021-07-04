const mongoose = require("mongoose")

const UserSchema=  new mongoose.Schema({
fullName : {
    type: String,
    required: true
},
email : {
    type: String,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true
},

phone : String,
userType: {
    type: String,
    default: "patient"
},

image: {
    type: String,
    default: "https://res.cloudinary.com/talk-amigo/image/upload/v1625387829/GyneConnect/GyneConnect_vzcnxr.jpg"
},
},{
    timestamps : true
}
)

module.exports = mongoose.model("User", UserSchema)