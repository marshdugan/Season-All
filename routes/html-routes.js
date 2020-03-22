var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if(req.isAuthenticated()){
      var user = {
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
      }
      res.render("index", user);
    } else {
      res.render("index");
    }
  });

  // app.get("/signup", function(req,res){
  //   if (req.isAuthenticated()){
  //       res.redirect("/accounts/view");
  //   } else {
  //     res.render("accounts"); 
  //   }
  // });
  
  app.get("/trails", function (req, res) {
    db.Trail.findAll({}).then(function (data) {
      res.render("user_home", {trail: data});
    });
  });

  // Load example page and pass in an example by id
  app.get("/trail/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("example", {
        example: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
