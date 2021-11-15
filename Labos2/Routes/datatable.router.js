const express = require('express');
const router = express.Router();
const db = require('../Datatable/database');
 

router.get('/', async function (req, res, next) {
    var rows = (await db.query("SELECT * FROM parking NATURAL JOIN zona", [])).rows;
    var lista = new Array();
    
    for(obj in rows){
        lista.push((Object.values(rows[obj])));
    }

    res.render('datatable', {
        linkActive: 'datatable',
        data: lista
    });
});

/* router.post('/', async function (req, res, next) {
    var search = req.body.search;
    var filter = req.body.filter;
    var sqlUpit = "";

    if (search == "id" || search == "brojmjesta" || search == "brojinvalidskihmjesta" || search == "dnevnakarta" || search == "pozivnibroj")
        sqlUpit = "SELECT * FROM parking NATURAL JOIN zona WHERE " + search + " = " + filter;
    else if (search == "wildcard") {
        if (parseInt(filter))
            sqlUpit = "SELECT * FROM parking NATURAL JOIN zona WHERE id = " + filter + " or brojmjesta = " 
                    + filter + " or brojinvalidskihmjesta = " + filter + " or pozivnibroj = " + filter +
                    " or dnevnakarta = " + filter;
        else
            sqlUpit = "SELECT * FROM parking NATURAL JOIN zona WHERE imeparkinga LIKE " + "'%" + filter + "%'" + 
            " or vrsta LIKE " + "'%" + filter + "%'" +
            " or županija LIKE " + "'%" + filter + "%'" +
            " or kvart LIKE " + "'%" + filter + "%'" +
            " or kvart LIKE " + "'%" + filter + "%'" +
            " or ulica LIKE " + "'%" + filter + "%'" +
            " or kućnibroj LIKE " + "'%" + filter + "%'" +
            " or zona LIKE " + "'%" + filter + "%'";
    }
    else
        sqlUpit = "SELECT * FROM parking NATURAL JOIN zona WHERE " + search + " LIKE " + "'%" + filter + "%'";

    var filtered_data = (await db.query(sqlUpit, [])).rows;
    var lista = new Array();
    
    for(obj in filtered_data){
        lista.push((Object.values(filtered_data[obj])));
    }

    res.render('datatable', {
        linkActive: 'datatable',
        data: lista
    }); 
}); */

module.exports = router;

/* select json_agg(row_to_json(p)) parking
from(
	select parking.id, parking.imeparkinga,
	parking.brojmjesta, parking.brojinvalidskihmjesta,
	parking.vrsta, parking.županija, parking.grad, parking.kvart,
	parking.ulica, parking.kućnibroj, (
	select row_to_json(z)
	from (select zona.zona id_zona, zona.dnevnakarta, zona.pozivnibroj from zona
		 where parking.zona = zona.zona) z
	) as zona
	from parking) p */