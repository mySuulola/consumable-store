const passport = require("passport");
const crypto = require('crypto')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')
const mail = require('../handlers/mail')



exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed Login",
  successRedirect: "/",
  successFlash: "You are now logged in"
}); 

exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You are  now logged out')
  res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'Oops you must be logged in to do that')
  res.redirect('back')
}

exports.forgot = async (req, res) => {
  // check if user exists
  const user = await User.findOne({email: req.body.email})
  if(!user) {
    req.flash('error', 'No account with that email exists')
    res.redirect('back')
  }
  // if yes, create a token and an expire time frame
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000
  await user.save()

  // send them an email with the token
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`
  await mail.send({
    user,
    subject: 'Password Reset',
    resetURL,
    filename: 'password-reset'
  })
  req.flash('success',  `You have been emailed a password reset link`)
  res.redirect('back')
}

exports.reset = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()}
  })
  if(!user) {
    req.flash('error', 'Password reset is expired or invalid')
    return res.redirect('/login')
  }
  res.render('reset', {title: 'Reset your Password'})
}

exports.confirmedPasswords = (req, res, next) => {
 if(req.body.password === req.body['password-confirm']) {
   return next()
 }
 req.flash('error', 'Passwords do not match')
 res.redirect('back')
}
exports.update = async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()}
  })
  if(!user) {
    req.flash('error', 'Password reset is expired or invalid')
    return res.redirect('/login')
  }
  // user.setPassword(req.body.password, callback)
  const setPassword = promisify(user.setPassword, user)
  await setPassword(req.body.password)
  user.resetPasswordExpires = undefined;
  user.resetPasswordToken = undefined;
  const updatedUser = await user.save()
  req.login(updatedUser)
  req.flash('success', 'Your password has been reset, You are now logged in')
  res.redirect('/')


}

