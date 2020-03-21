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

  app.get("/list-items", function(req,res){
    res.render("search");
  });

  app.get("/signup", function(req,res){
    if (req.isAuthenticated()){
        res.redirect("/acounts/view");
    } else {
      res.render("accounts"); 
    }
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
