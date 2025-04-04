const express = require("express");
const expbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = new express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const port = 5000;

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express session
app.use(session({
  secret:'mysecret',
  resave: false,
  saveUninitialized: true,
}));
//passport config
require("./config/passport");
// add passport
app.use(passport.initialize());
app.use(passport.session());
//configure passport
app.use(flash());

//passport middleware for flash messages
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.error = req.flash("error");
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});




//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
//view engin
const hbs = expbs.create({defaultLayout: "main"});
app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});