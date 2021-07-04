const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {LocalStorage} = require("node-localstorage");

localStorage = new LocalStorage('./scratch'); 

 const ensureAuth = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers)
  const jwt_token = localStorage.getItem("jwt");
  if (
    jwt_token && jwt_token.startsWith("Bearer")
  ) {
    try {
      token = jwt_token.split(" ")[1];

      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.doctor = await Doctor.findById(decodeToken.id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token, Not authorized");
  }
});

const ensureUserAuth = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers)
  const jwt_token = localStorage.getItem("jwt");
  if (
    jwt_token && jwt_token.startsWith("Bearer")
  ) {
    try {
      token = jwt_token.split(" ")[1];

      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodeToken.id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token, Not authorized");
  }
});


module.exports = {
    ensureAuth,
    ensureUserAuth,
    ensureGuest: function (req, res, next) {
      if (!req.headers.authorization) {
        console.log("guest")
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }