var db = require("../models");
const passport = require("passport");

module.exports = function (app) {
  // Get all examples
  

  // Create a new example
  app.post("/api/trail", function (req, res) {
    if (req.session.passport !== undefined) {
      console.log(req.session.passport.user);
      db.Trail.destroy({
        where: {AccountUuid: req.session.passport.user},
        truncate: true
      });
  
      for (let i = 0; i < req.body.trail.length; i++) {
        db.Trail.create({
          trailId: req.body.trail[i].trailId,
          name: req.body.trail[i].name,
          type: req.body.trail[i].type,
          summary: req.body.trail[i].summary,
          difficulty: req.body.trail[i].difficulty,
          stars: req.body.trail[i].stars,
          AccountUuid: req.session.passport.user
        }).then(function (data) {
          if (i === req.body.trail.length - 1) {
            res.json(data);
          }
        });
      }
    }
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
