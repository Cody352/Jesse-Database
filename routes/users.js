const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const middleware = require("../middleware/index");

router.get("/", function (req, res) {
  res.render("./clients/landing", { currentUser: req.user });
});

// Get register form
router.get("/register", function (req, res) {
  res.render("register");
});

// Handle signup logic
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  if (req.body.adminCode === "adminsecret") {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to Commerce " + user.username);
      res.redirect("/");
    });
  });
});

//  Get the login form
router.get("/login", function (req, res) {
  res.render("./login");
});

//handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
  // We can have a callback here but not required because we use the above middleware.
);

// logout route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/");
});

module.exports = router;
