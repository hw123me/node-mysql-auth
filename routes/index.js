const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../config/auth");
const { raw } = require("body-parser");

//home page
router.get("/", (req, res) => {
    res.render("home");
  });

  // dashboard page
router.get("/dashboard", isAuthenticated, (req, res) => {
  if (req.user.role === "admin") {
    res.render("admin/dashboard",{ layout: "admin"});
  } else {
    res.render("dashboard",{email:req.user.email});
  }
  
});

  module.exports = router;