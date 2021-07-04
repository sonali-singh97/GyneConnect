const asyncHandler = require("express-async-handler")
const Doctor = require("../models/doctor")
const bcrypt = require("bcryptjs")
const generateToken = require("../utilities/generateToken");
const {LocalStorage} = require("node-localstorage");
const doctors_data = require("../doctors_data");
const axios = require("axios")

localStorage = new LocalStorage('./scratch'); 

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
    const { email, password } = req.body;
  
    const doctor = await Doctor.findOne({ email });
    
    if (doctor && (await bcrypt.compare(password, doctor.password))) {
        const jwt_token = "Bearer " + generateToken(doctor._id)
        localStorage.setItem("jwt", jwt_token);
    //     res.status(200).json({
    //     fullname: doctor.fullname,
    //     email: doctor.email,
    //     isVerified: doctor.isVerified,
    //     token: jwt_token,
    //   });
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


  const addDoctor =async ()=> {
//   const data = Object.entries(doctors_data[0]);
//   const req ={};
//   req.body ={};
//   req.body.tags=[]
//   for(i =0; i <20; i++) {
//   data.forEach((ele, index)=>{
//   // console.log(ele[0])
//    const val= Object.values(ele[1])
//   // console.log(val[i])
//   if(ele[0].startsWith("TAG")){
//       req.body.tags.push(ele[0])
//   }
//    req.body[ele[0]] = val[i];
//   })

//   console.log(req)
//   const res = await axios.post("/auth/register/doctor", req)

//  }

}
module.exports={
    registerDoctor,
    loginDoctor,
    logoutDoctor,
    addDoctor
}


