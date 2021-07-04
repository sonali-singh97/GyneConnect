const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const generateToken = require("../utilities/generateToken");
const {LocalStorage} = require("node-localstorage");

localStorage = new LocalStorage('./scratch'); 

// @desc Register User
// @route POST /auth/user/signup
// @Access Public
const registerUser = asyncHandler(async (req, res) => {
    console.log("request")
    const {
        fullName,
        email,
        password,
    } = req.body;

    const user = await User.findOne({
        email
    });

    if (user) {
        res.status(422).json({
            msg: "User already exists in database"
        })
    } else {
        const hashedPassword = await bcrypt.hash(password, 12)
   
        const newUser = new User({
            fullName,
            email,
            password : hashedPassword,
        });

        try {
            const result = await newUser.save();
            res.status(200).render('index', {
                result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }
});

// @desc Login User
// @route POST /auth/uer/login
// @Access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
        const jwt_token = "Bearer " + generateToken(user._id)
        localStorage.setItem("jwt", jwt_token);
        res.status(200).json({
        fullname: user.fullname,
        email: user.email,
        token: jwt_token,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password !!");
    }
  });

// @desc Logout User
// @route GET /auth/users/logout
// @Access Private
const logoutUser = asyncHandler(async (req, res) => {
    localStorage.removeItem("jwt");
    res.status(200).render("index")
  });

module.exports={
    registerUser,
    loginUser,
    logoutUser
}