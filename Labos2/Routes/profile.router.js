const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    if (req.oidc.user === undefined)
        res.redirect("/login");
    else {
        res.render('profile', {
            user: req.oidc.user,
            linkActive: 'profile'
        });
    }
    
});

module.exports = router;