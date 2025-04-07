// This file contains the authentication middleware for the application
module.exports = {
    isAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
  
      req.flash("errorMessage", " لا تملك صلاحية الوصول إلى هذه الصفحة ");
      res.redirect("/users/login");
    }
  };
    
   
//isAdmin middleware to check if the user is an admin
    module.exports.isAdmin = function(req, res, next) {
      if (req.user.role === "admin") {
        return next();
      }
      req.flash("errorMessage", " لا تملك صلاحية الوصول إلى هذه الصفحة ");
      res.redirect("/users/login");
    };