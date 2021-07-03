const asyncHandler = require("express-async-handler")
const Doctor = require("../models/doctorModel")
const bcrypt = require("bcryptjs")
const generateToken = require("../utilities/generateToken");
const {LocalStorage} = require("node-localstorage");

localStorage = new LocalStorage('./scratch'); 

// @desc Register Doctor
// @route POST /api/doctors/signup
// @Access Public
const registerDoctor = asyncHandler(async (req, res) => {
    console.log("request")
    const {
        fullName,
        email,
        password,
        gender,
        hospitalName,
        location,
        phone,
        website,
        remarks
    } = req.body;

    const doctor = await Doctor.findOne({
        email
    });
    if (doctor) {
        res.status(422).json({
            msg: "Doctor already exists in database"
        })
    } else {
        const hashedPassword = await bcrypt.hash(password, 12)
   
        const newDoctor = new Doctor({
            fullName,
            email,
            password : hashedPassword,
            gender,
            hospitalName,
            location,
            phone,
            website,
            remarks
        });

        try {
            const result = await newDoctor.save();
            res.status(200).render('index', {
                result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }
});

// @desc Login Doctor
// @route POST /api/doctors/login
// @Access Public
  const loginDoctor = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const doctor = await Doctor.findOne({ email });
    
    if (doctor && (await bcrypt.compare(password, doctor.password))) {
        const jwt_token = "Bearer " + generateToken(doctor._id)
        localStorage.setItem("jwt", jwt_token);
        res.status(200).json({
        fullname: doctor.fullname,
        email: doctor.email,
        isVerified: doctor.isVerified,
        token: jwt_token,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password !!");
    }
  });

// @desc Logout Doctor
// @route GET /api/doctors/login
// @Access Private
const logoutDoctor = asyncHandler(async (req, res) => {
    localStorage.removeItem("jwt");
    res.status(200).render("index")
  });

module.exports={
    registerDoctor,
    loginDoctor,
    logoutDoctor
}