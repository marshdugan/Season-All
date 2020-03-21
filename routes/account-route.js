var db = require("../models");

var passport = require('passport');

module.exports = function (app) {

    app.get("/signup", function (req, res) {
        if (req.isAuthenticated()){
            res.redirect("/acounts/view");
        } else {
            res.render("accounts"); 
        }
    });

    app.get("/accounts/view", function (req, res) {
        if (req.isAuthenticated()) {
            db.Accounts.findOne({
                where: {
                    uuid: req.session.passport.user
                },
                include: [db.Trail]
            }).then(function (dbUser) {
                var user = {
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: req.isAuthenticated()
                }
                res.render("user_home", user);
            })
        }
        else {
            var user = {
                id: null,
                isloggedin: req.isAuthenticated()
            }
            res.redirect("/");
        }
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            req.logout();
            res.clearCookie('user_sid');
            res.clearCookie('first_name');
            res.clearCookie('user_id');
            res.redirect('/');
        })
    });
    
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            console.log("info", info);
            if (err) {
                console.log("passport err", err);
                return next(err); // will generate a 500 error
            }
            if (!user) {
                console.log("user error", user);
                return res.send({ success: false, message: 'authentication failed' });
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    console.log("loginerr", loginerr)
                    return next(loginErr);
                }
                console.log('redirecting....');
                res.cookie('first_name', user.first_name);
                res.cookie('user_id', user.uuid);
                return res.redirect("/accounts/view");
            });
        })(req, res, next);
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                console.log("passport err", err);
                return next(err); // will generate a 500 error
            }
            if (!user) {
                return res.send({ success: false, message: 'authentication failed' });
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    console.log("loginerr", loginErr)
                    return next(loginErr);
                }

                console.log('redirecting....')
                res.cookie('first_name', user.first_name);
                res.cookie('user_id', user.uuid);

                return res.json(true);

            });
        })(req, res, next);
    });
}
