const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const User = require('../models/user')

passport.use(new Strategy(function (token, done) {
  User.findOne({ token: token }, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    return done(null, user)
  })
}))
module.exports = passport.initialize()
