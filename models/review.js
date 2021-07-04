const mongoose = require("mongoose")

const ReviewSchema =  new mongoose.Schema({
 doctorName : {type: String, required : true},
 doctorEmail : {type: String},
 location: {type: String, required : true},
 gender: String,
 phone : String,
 hospitalName: {type: String, required : true},
 hospitalAddress: String,
 OfficeHours: String,
 Fees: String,
 tags : String,
 testimonial :String,
 userDetails : String
},
{
    timestamps: true
})

module.exports = mongoose.model("Review", ReviewSchema)