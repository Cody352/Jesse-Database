const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/jesse", { useNewUrlParser: true });

const clientsSchema = new mongoose.Schema({
  clientName: "String",
  clientAddress: "String",
  workDate: "Date",
  invoiceAmount: "Number",
  paymentReceived: "String",
  telno: "Number",
  product: "String",
});

module.exports = mongoose.model("Client", clientsSchema);
