const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv")
const Doctor = require("../models/doctor")
const Apppointment = require("../models/appointment")
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

dotenv.config();

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_user: "apikey",
        api_key: process.env.API_KEY,
      },
    })
  );

// @desc Book Appointment
// @route POST /appointment/book
// @Access Public
const bookAppointment = asyncHandler(async (req, res) => {
    console.log("request")
    const {
       doctorId,
       date,
       time,
    } = req.body;

   const patientId = req.user._id
   const appointment = await Apppointment.findOne({doctorId, date, time})
  
   if(appointment){
    res.status(422).json({
        msg: "This Time slot is already booked"
    })
   }
   else{
       const newAppointment = new Apppointment({
        doctorId,
        date,
        time,
        patientId
       })

       try {
        const result = await newAppointment.save();

        const schedule = await Doctor.findByIdAndUpdate(doctorId, {$push : { timeSlots : {date, patientId, startTime: time, avalable: false}  }},{ new : true}) 
        console.log("book schedule")

        // if(result && schedule){
        // transporter.sendMail({
        //     to: user.email,
        //     from: "gyne.connect@gmail.com",
        //     subject: "Scheduled Appointment on GyneConnect ",
        //     html: "<h1>You appointment is booked with Dr.Aditi at 4PM today</h1>",
        //   }, function(err, res) {
        //     if (err) { 
        //         console.log(err) 
        //     }
        //     console.log(res);
        // });

        //   console.log("sendEmail")
        // }
         
        res.status(200).render('index', {
            msg: "Check your mail for appointment datails"
        })
    } catch (err) {
        res.status(500).send(err)
    }
   }
  
});

module.exports= {
    bookAppointment
}