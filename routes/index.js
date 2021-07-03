const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/authMiddleware')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('index')
  })

  module.exports = router