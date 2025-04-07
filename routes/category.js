const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../config/auth");
const Category = require("../models/Category");
const { raw } = require("body-parser");

//parts page
router.get("/view",isAuthenticated, isAdmin, (req, res) => {
    Category.findAll({raw:true})
      .then((cats) => {
        res.render("parts/view", { cats , layout: "admin" });
      })
      .catch((err) => {
        console.log(err);
      });
  });                           
   

  router.get("/add",isAuthenticated,isAdmin, (req, res) => {
    res.render("parts/add" ,{ layout: "admin" });
  });

  //upload image
  let imagename;
const multer = require("multer"); 
// const { send, title } = require("process");
// const { profile } = require("console");
// const { route } = require("../route");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
    imagename = file.originalname;
  },
});
const upload = multer({ storage: storage });
//post
  router.post("/add",upload.single("img"), (req, res) => {
    const { categoryname, desc, img } = req.body;
    
    let errors = [];
    // Check required fields
    if (!categoryname) {
      errors.push({ msg: "Please fill name field" });
    }
    
    if (errors.length > 0) {
      res.render("parts/add", { errors });
    } else {
      Category.findOne({ where: { name: categoryname } })
        .then((cat) => {
          if (cat) {
            errors.push({ msg: "Name already registered" });
            res.render("parts/add", { errors });
          } else {
            const newCat = new Category({
              name: categoryname,
              description: desc,
              img:imagename ,
            });
            newCat.save()
              .then((cat) => {
                console.log("category created");
                req.flash(
                  "successMessage",
                  " your category is created "
                );
                res.redirect("/parts/view");
              })
              .catch((err) => {
                console.log(err);
                req.flash("ErrorMessage", "There an error");
                res.redirect("/parts/add");
              });
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
//edit category
  router.get("/edit/:id",isAuthenticated,isAdmin, (req, res) => {
    Category.findByPk(req.params.id, {raw:true})
      .then((cat) => {
        console.log(cat);
        res.render("parts/edit", { cat , layout: "admin"});
      })
      .catch((err) => {
        console.log(err);
      });
  } );
router.post("/edit/:id",upload.single("img"), (req, res) => {
  if (imagename == null) {
    imagename = req.body.oldimage;
  }
    const { categoryname, desc, img } = req.body;
    let errors = [];
    // Check required fields
    if (!categoryname) {
      errors.push({ msg: "Please fill name field" });
    }
    
    if (errors.length > 0) {
      res.render("parts/edit", { errors });
    } else {
      Category.update(
        { name:categoryname, description: desc, img:imagename },
        { where: { id: req.params.id } }
      )
        .then(() => {
          req.flash(
            "successMessage",
            " your category is updated "
          );
          res.redirect("/parts/view");
        })
        .catch((err) => {
          console.log(err);
          req.flash("ErrorMessage", "There an error");
          res.redirect("/parts/add");
        });
      
    }
  });
//delete category
router.post("/delete/:id",isAuthenticated,isAdmin, (req, res) => {
    Category.destroy({ where: { id: req.params.id } })
      .then(() => {
        console.log("category deleted");
        req.flash(
          "successMessage",
          " your category is deleted "
        );
        res.redirect("/parts/view");
      })
      .catch((err) => {
        console.log(err);
        req.flash("ErrorMessage", "There an error");
        res.redirect("/parts/view");
      });
  });
  module.exports = router;