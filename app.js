const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const clientRoutes = require("./routes/clients");
const flash = require("connect-flash");
const User = require("./models/index");
const Client = require("./models/clients");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

// Setup Mongoose
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set(
  "useUnifiedTopology",
  true,
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);
mongoose.connect("mongodb://localhost:27017/jesse", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

// Setup Passport
app.use(
  require("express-session")({
    secret: "any secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Calling locals.
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(userRoutes);
app.use(clientRoutes);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is on port 3000");
});
