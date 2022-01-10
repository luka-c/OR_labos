const express = require('express');
const router = express.Router();
const db = require('../Datatable/database');

router.get('/', async function (req, res, next) {
    if (req.oidc.user === undefined)
        res.redirect("/login");
    var rows = (await db.query("SELECT zona FROM zona", [])).rows;
    var vrste = new Array("automobilski", "kamionski", "autobusni", "biciklistički", "mješoviti");
    var zone = new Array();
    
    for(obj in rows){
        zone.push((Object.values(rows[obj])));
    }

    res.render('datatable', {
        linkActive: 'datatable',
        zones: zone,
        types: vrste,
        user: req.oidc.user
    });
});

module.exports = router;

