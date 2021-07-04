const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/authMiddleware')
const { registerDoctor, loginDoctor, logoutDoctor} = require("../controller/doctor")
const { registerUser, loginUser, logoutUser} = require("../controller/user")

router.route("/doctor/signup").all(ensureGuest).post(registerDoctor)

router.route("/doctor/login").all(ensureGuest).post(loginDoctor)

router.route("/doctor/logout").all(ensureAuth).get(logoutDoctor)

router.route("/user/signup").all(ensureGuest).post(registerUser)

router.route("/user/login").all(ensureGuest).post(loginUser)

router.route("/user/logout").all(ensureAuth).get(logoutUser)

module.exports = router