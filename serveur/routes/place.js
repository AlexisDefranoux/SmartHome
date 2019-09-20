var express = require('express');
var router = express.Router();
const util = require('../db/placeUtil');

router.get('/', async (req, res) => {
    try{
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM place where state = 1');
        res.status(200).json(queryRows);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('/ByUserId/:id', async (req, res) => {
    var id = Number(req.params.id);
    if (! id || typeof id != "number") {
        res.status(400).send('bad id type or value');
        return;
    }
    try{
        //let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM place where state = 1 and (idUser = ? or idUser is NULL or 1 = (select role from user where idUser = ?))', [id, id]);
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM place where state = 1', [id, id]);
        res.status(200).json(queryRows);
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
});

router.get('/ById/:id', async (req, res) => {
    var id = Number(req.params.id);
    if (! id || typeof id != "number") {
        res.status(400).send('bad id type or value');
        return;
    }
    try{
        let [rows, fields] =  await req.db.query('SELECT * FROM place where idPlace = ?', id);
        if (Array.isArray(rows) && rows.length > 0){
            res.status(200).json(rows[0]);
            return;
        }
        res.status(404).send(""+rows.length);
    }catch(err) {
        console.log
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    var name = req.body.name;
    var state = req.body.state;

    if (!(name && state)){
        console.log("name "+name+ ",state "+state);
        res.status(400).send("At least one parameter is missing");
        return;
    }
    if (! (typeof name == 'string' && typeof state == 'number')){
        res.status(400).send("At least one parameter is of bad type");
        return;
    } 

    try {
    const [rows, fields] = await req.db.execute('INSERT INTO place (name) values(?)', [name]);
    if (rows.ERROR) {
        res.status(409).send(rows.ERROR);
        return;
    }
    var idPlace = rows.insertId;
    if (! idPlace) {
        res.status(500).send('ID null after insert');
    }

    var place = req.body;
    place.idPlace = idPlace;
    res.status(200).json(place);
	} catch (err){
	    res.status(500).json(err);
	    return;
	}
});

module.exports=router;