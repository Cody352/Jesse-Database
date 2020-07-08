const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/jesse", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: "String",
  password: "String",
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
