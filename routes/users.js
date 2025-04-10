const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
// const { where } = require("sequelize");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];
  // Check required fields
  if (!email || !password || !password2) {
    errors.push({ msg: "أكمل البيانات الناقصة" });
  }
  if (password !== password2) {
    errors.push({ msg: "كلمة المرور غير متطابقة" });
  }
  if (password.length < 5) {
    errors.push({ msg: "كلمة المرور أقل من 5 رموز" });
  }
  console.log(errors);
  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          errors.push({ msg: "البريد الإلكتروني مستخدم من قبل" });
          res.render("register", { errors });
        } else {
          const newUser = new User({
            email,
            password,
          });
          // Hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  console.log("user created");
                  req.flash(
                    "successMessage",
                    " تم إنشاء الحساب بنجاح من فضلك سجل الدخول"
                  );
                  res.redirect("/users/login");
                })
                .catch((err) => {
                  console.log(err);
                  req.flash("ErrorMessage", "There an error");
                  res.redirect("/users/register");
                });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
});

module.exports = router;
