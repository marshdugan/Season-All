var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/trails", function(req, res) {
    db.Trail.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Create a new example
  app.post("/api/trail", function(req, res) {
    db.Trail.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
