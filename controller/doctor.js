const asyncHandler = require("express-async-handler")
const Doctor = require("../models/doctor")
const bcrypt = require("bcryptjs")
const generateToken = require("../utilities/generateToken");
const {
    LocalStorage
} = require("node-localstorage");
const doctors_data = require("../doctors_data");

localStorage = new LocalStorage('./scratch');

const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({})
    return doctors
    //res.status(200).render("find_a_doctor", {doctors})
})

// @desc Register Doctor
// @route POST /auth/doctor/signup
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
            password: hashedPassword,
            gender,
            hospitalName,
            location,
            phone,
            website,
            remarks
        });

        try {
            const result = await newDoctor.save();
            res.status(200).redirect("/")
        } catch (err) {
            res.status(500).send(err)
        }
    }
});

// @desc Login Doctor
// @route POST /auth/doctor/login
// @Access Public
const loginDoctor = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const doctor = await Doctor.findOne({
        email
    });

    if (doctor && (await bcrypt.compare(password, doctor.password))) {
        const jwt_token = "Bearer " + generateToken(doctor._id)
        localStorage.setItem("jwt", jwt_token);
        res.status(200).redirect("/doctor-login")
    } else {
        res.status(401);
        throw new Error("Invalid email or password !!");
    }
});

// @desc Logout Doctor
// @route GET /auth/doctor/login
// @Access Private
const logoutDoctor = asyncHandler(async (req, res) => {
    localStorage.removeItem("jwt");
    res.status(200).redirect("/")
});


const getProfile = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)
    return doctor;
});

const findNearbyDoctor = asyncHandler(async (req, res) => {
    console.log(req.body.input)
    const doctors = await Doctor.find({})
    const tokens = req.body.input
        .toLowerCase()
        .split(' ')
        .filter(function (token) {
            return token.trim() !== ''
        })

    const searchTermRegex = new RegExp(tokens.join('|'), 'gim')

    const doctorsArray = doctors.map(
        (ele) => `${ele.fullName } ${ele.location} ${ele.tags.join(' ')}  ${ele.address} ${ele.hospitalName} `,
    )
    const filteredList = doctors.filter(function (ele, index) {
        if(doctorsArray[index].match(searchTermRegex))
           return ele
        
    })
    console.log(filteredList)
    res.render('find_a_doctor', {
        doctors : filteredList
    })

});

module.exports = {
    registerDoctor,
    loginDoctor,
    logoutDoctor,
    getAllDoctors,
    getProfile,
    findNearbyDoctor
}