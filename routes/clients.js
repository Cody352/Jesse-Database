const express = require("express");
const router = express.Router();
const Client = require("../models/clients");
const clients = require("../models/clients");

// Get Clients / Index route
router.get("/clients", function (req, res) {
  // Get all clients from db.
  Client.find({}, function (err, allClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("clients/index", { clients: allClients });
    }
  });
});

// New Route
router.get("/clients/new", function (req, res) {
  res.render("clients/new");
});

// Create a new client
router.post("/clients", function (req, res) {
  const clientName = req.body.clientName;
  const clientAddress = req.body.clientAddress;
  const workDate = req.body.workDate;
  const invoiceAmount = req.body.invoiceAmount;
  const paymentReceived = req.body.paymentReceived;
  const telno = req.body.telno;
  const product = req.body.product;
  const newClient = {
    clientName: clientName,
    clientAddress: clientAddress,
    workDate: workDate,
    invoiceAmount: invoiceAmount,
    paymentReceived: paymentReceived,
    telno: telno,
    product: product,
  };
  Client.create(newClient, function (err, newlyCreated) {
    if (err) {
      throw err;
    } else {
      res.redirect("clients");
    }
  });
});

//  SHOW - shows more info about one product
router.get("/clients/:id", function (req, res) {
  Client.findById(req.params.id, function (err, foundClient) {
    if (err) {
      throw err;
    } else {
      res.render("clients/show", { clients: clients });
    }
  });
});

// Edit Route
router.get("/clients/:id/edit", function (req, res) {
  Client.findById(req.params.id, function (err, foundClient) {
    if (err) {
      throw err;
    } else {
      res.render("./clients/edit", { clients: foundClient });
    }
  });
});

// UPDATE THE EDITED PRODUCT
router.put("/clients/:id", function (req, res) {
  Client.findByIdAndUpdate(req.params.id, req.body.clients, function (
    err,
    updatedClient
  ) {
    if (err) {
      console.log(updatedClient);
    } else {
      console.log(updatedClient);
      res.redirect("/clients");
    }
  });
});

// DELETE A CLIENT
router.delete("/clients/:id", function (req, res) {
  // Let us test.
  // res.send('You are trying to delete something.')
  Client.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/clients");
    }
  });
});

module.exports = router;
