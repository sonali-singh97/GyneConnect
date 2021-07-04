const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/authMiddleware')
const {getAllDoctors, getProfile} = require('../controller/doctor')

// @desc    Login/Landing page
// @route   GET /
  router.get('/', ensureGuest, (req, res) => {
    res.render('index')
  })

  router.get('/find_a_doctor', ensureGuest, async(req, res) => {
    const doctors = await getAllDoctors()
    res.render('find_a_doctor', {doctors})
  })

  router.get('/review', ensureGuest, (req, res) => {
    res.render('review')
  })

  router.get('/signup', ensureGuest, (req, res) => {
    res.render('sign_up')
  })

  router.get('/resources', ensureGuest, (req, res) => {
    res.render('resources')
  })

  router.get('/report', ensureGuest, (req, res) => {
    res.render('report')
  })

  router.get('/login', ensureGuest, (req, res) => {
    res.render('log_in')
  })

  router.get('/doctor_signup', ensureGuest, (req, res) => {
    res.render('doctor_sign_up')
  })

  router.get('/doctor_login', ensureGuest, (req, res) => {
    res.render('doctor_log_in')
  })

  router.get('/doctor/:id',async (req, res)=>{
    const doctor = await getProfile(req, res)
    res.render("find_a_doctor_full_profile", {doctor})
  } )

  router.get('/book',  (req, res) => {
    res.render('book')
  })



  module.exports = router