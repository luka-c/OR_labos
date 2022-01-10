const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Index',
        linkActive: 'index',
        user: req.oidc.user
    });
});

module.exports = router;