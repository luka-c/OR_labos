const express = require('express');
const router = express.Router();
const db = require('../Datatable/database');
const openapi = require('../openapi.json');

router.get('/parkings', async function(req, res, next){
    var rows = (await db.query("SELECT * FROM parking NATURAL JOIN zona", [])).rows;

    if(rows === undefined) {
        return res.status(404).json({
            status: 404,
            message: "No parkings to fetch",
            response: null
        });
    }

    var lista = new Array();
    
    for(obj in rows){
        lista.push((Object.values(rows[obj])));
    }

    res.status(200).json({
        status: 200,
        message: "Fetched parkings",
        response: lista
    });
});

router.get('/types', async function(req, res, next){
    var vrste = new Array();
    vrste.push("automobilski", "kamionski", "autobusni", "biciklistički", "mješoviti")
    res.status(200).json({
        status: 200,
        message: "Fetched types",
        response: vrste
    });
});

router.get('/openapi', async function(req, res, next){
    res.json(openapi);
});

router.get('/zones', async function(req, res, next){
    var rows = (await db.query("SELECT * FROM zona", [])).rows;

    if(rows === undefined) {
        return res.status(404).json({
            status: 404,
            message: "No zones to fetch",
            response: null
        });
    }

    var lista = new Array();
    
    for(obj in rows){
        lista.push((Object.values(rows[obj])));
    }
    res.status(200).json({
        status: 200,
        message: "Fetched zones",
        response: lista
    });
});

router.get('/zones/:id', async function(req, res, next){
    var zone = (await db.query("SELECT * FROM zona", [])).rows;
    var lista = new Array();
    
    switch (req.params.id) {
        case "1":
            lista.push(zone[0], zone[1], zone[2], zone[3]);
            break;
        case "2":
            lista.push(zone[4], zone[5]);
            break;
        case "3":
            lista.push(zone[6]);
            break;
        case "4":
            lista.push(zone[7], zone[8]);
            break;
        case "free":
            lista.push(zone[9]);
            break;
        default:
            return res.status(404).json({
                status: 404,
                message: "Zone with that id does not exist",
                response: null
            });
    }
    
    res.status(200).json({
        status: 200,
        message: "Fetched zona",
        response: lista
    });
});

router.get('/parkings/:id', async function(req, res, next) {
    try {
        var podatak = (await db.query("SELECT * FROM parking NATURAL JOIN zona where id = $1", [req.params.id])).rows[0];
        if (podatak !== undefined)
            res.status(200).json({
                status: 200,
                message: "Fetched parking",
                response: podatak
            });
        else {
            res.status(404).json({
                status: 404,
                message: "Parking with that id does not exist",
                response: null
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Parking id has to be of type: Integer",
            response: null
        });
    } 
});

router.put('/parkings/edit/:id', async function(req, res, next) {
    if (!parseInt(req.params.id)) {
        return res.status(400).json({
            status: 400,
            message: "Parking id has to be of type: Integer",
            response: null
        });
    }
    var checkId = (await db.query("select * from parking where id=$1", [req.params.id])).rows[0];
    
    if (checkId === undefined) { 
        return res.status(404).json({
            status: 404,
            message: "Parking with that id does not exist",
            response: null
        });
    }

    try {
        var query = "UPDATE parking SET imeparkinga=$2, brojmjesta=$3, brojinvalidskihmjesta=$4, vrsta=$5, zona=$6, "
                    + "županija=$7, grad=$8, kvart=$9, ulica=$10, kućnibroj=$11 WHERE id=$1";
        console.log(req.body);

        var azuriraj = (await db.query(query,
            [req.params.id, req.body.imeparkinga, req.body.brojmjesta, req.body.brojinvalidskihmjesta, req.body.vrsta,
             req.body.zona, req.body.županija, req.body.grad, req.body.kvart, req.body.ulica, req.body.kućnibroj])).rows;

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: "Failed to update parking",
            response: null
        });
    }

    checkId = (await db.query("select * from parking where id=$1", [req.params.id])).rows[0];
    res.status(202).json({
        status: 202,
        message: "Updated parking",
        response: checkId
    }); 
});

router.post('/parkings/new', async function(req, res, next) {
    var query = "INSERT INTO parking (id, imeparkinga, brojmjesta, brojinvalidskihmjesta, vrsta, zona, županija, grad, kvart, ulica, kućnibroj) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    var id = (await db.query("SELECT id FROM parking ORDER BY id DESC", [])).rows[0].id;
    try { 
        var ubaci = (await db.query(query,
            [id + 1, req.body.imeparkinga, req.body.brojmjesta, req.body.brojinvalidskihmjesta, req.body.vrsta,
             req.body.zona, req.body.županija, req.body.grad, req.body.kvart, req.body.ulica, req.body.kućnibroj])).rows;
        console.log(ubaci);
    }
    catch(error) {
        res.status(400).json({
            status: 400,
            message: "Failed to create parking",
            response: null
        });
    }

    res.status(201).json({
        status: 201,
        message: "Created parking",
        response: req.body
    }); 
});

router.delete('/parkings/delete/:id', async function(req, res, next) {
    try {
        var checkId = (await db.query("SELECT id FROM parking WHERE id=$1", [req.params.id])).rows[0];
        if (checkId === undefined) { 
            return res.status(404).json({
                status: 404,
                message: "Parking with that id does not exist",
                response: null
            });
        }

        var del = (await db.query("DELETE FROM parking WHERE id=$1", [req.params.id])).rows[0];
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Parking id has to be of type: Integer",
            response: null
        });
    }

    res.status(200).json({
        status: 200,
        message: "Deleted parking",
        response: req.params.id
    });
});

module.exports = router;