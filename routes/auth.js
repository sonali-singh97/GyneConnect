const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/authMiddleware')
const { registerDoctor, loginDoctor, logoutDoctor} = require("../controller/doctorController")

router.route("/doctor/signup").all(ensureGuest).post(registerDoctor)

router.route("/doctor/login").all(ensureGuest).post(loginDoctor)

router.route("/doctor/logout").all(ensureAuth).get(logoutDoctor)

module.exports = router