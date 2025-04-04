const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../config/auth");

//home page
router.get("/", (req, res) => {
    res.render("home");
  });

  // dashboard page
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard");
});

  module.exports = router;