const asyncHandler = require("express-async-handler")
const Doctor = require("../models/doctor")
const bcrypt = require("bcryptjs")
const generateToken = require("../utilities/generateToken");
const {LocalStorage} = require("node-localstorage");
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


//   const addDoctor =async ()=> {
//   const data = Object.entries(doctors_data[0]);

// let arr = []
// // let obj ={}
//  const len = data.length
// let keys =[]
// for(let i =0; i < len; i++){
// keys.push(data[i][0])
// }
// console.log(keys)
// const nameValues = Object.values(data[0][1])
// const emailValues = Object.values(data[2][1])
// const addressValues = Object.values(data[6][1])
// const phoneValues = Object.values(data[5][1])
// const genderValues = Object.values(data[4][1])
// const locationValues = Object.values(data[1][1])
// const feesValues = Object.values(data[8][1])
// const officeHrsValues = Object.values(data[7][1])
// const hospitalNameValues = Object.values(data[3][1])
// const reviewsValues = Object.values(data[17][1])
// const tagAuto = Object.values(data[9][1])
// const tagTrans = Object.values(data[10][1])
// const tagQueer = Object.values(data[11][1])
// const tagAbuse = Object.values(data[12][1])
// const tagStd= Object.values(data[13][1])
// const tagBody = Object.values(data[14][1])
// const tagConsent = Object.values(data[15][1])

// // console.log(values)
// for( let i =0; i < 450; i++){

//  let tags = [tagAuto[i] &&  'Treats patients as autonomous individuals' ,tagTrans[i] && 'Trans friendly' , tagQueer[i] &&'Queer friendly' ,tagAbuse[i] && 'Treat survivors of abuse sensitively and respectfully', tagStd[i] && 'AIDS/Other STDs friendly', tagBody[i] && 'Body Positive', tagConsent[i] && 'Will not demand partner/parent’s consent/approval']

//  tags =tags.filter(data => data!== false)
//   arr.push({
//       fullName : nameValues[i] !== null ? nameValues[i] : "",
//       email : emailValues[i] !== null ? emailValues[i] : `null${i}`,
//       address : addressValues[i] !== null ? addressValues[i] : "",
//       phone : phoneValues[i] !== null ? phoneValues[i] : "",
//       gender : genderValues[i] !== null ? genderValues[i] : "",
//       location : locationValues[i] !== null ? locationValues[i] : "",
//       fees : feesValues[i] !== null ? feesValues[i] : "",
//       officeHours : officeHrsValues[i] !== null ? officeHrsValues[i] : "",
//       hospitalName : hospitalNameValues[i] !== null ? hospitalNameValues[i] : "",
//       reviews : reviewsValues[i] !== null ? reviewsValues[i] : "",
//       tags
//   })
// }
//  console.log(arr)

// const newDoctors = await Doctor.insertMany(arr)



// }
module.exports={
    registerDoctor,
    loginDoctor,
    logoutDoctor,
    getAllDoctors
}


