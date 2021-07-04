const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest, ensureUserAuth } = require('../middlewares/authMiddleware')
const { bookAppointment} = require("../controller/appointment")



router.route("/book").all(ensureUserAuth).post(bookAppointment)


module.exports = router