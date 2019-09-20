const dbUtils = require('../db/utils');
const placeUtil = require ('../db/placeUtil');
var express = require('express');
var router = express.Router();

router.get("/", async (req, res) => {
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM mode');
        res.status(200).json(queryRows);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    var label = req.body.label;
    var tMin = req.body.tMin;
    var tMax = req.body.tMax;

    if (!(label && tMin && tMax)){
        console.log("label "+label+ ",tMin "+tMin+"tMax : "+tMax);
        res.status(400).send("At least one parameter is missing");
        return;
    }
    if (! (typeof label == 'string' && typeof tMin == 'number' && typeof tMax == 'number')){
        res.status(400).send("At least one parameter is of bad type");
        return;
    } 

    try {
    const [rows, fields] = await req.db.execute('INSERT INTO mode (label, tMax, tMin) values(?, ?, ?)', [label, tMax, tMin]);
    if (rows.ERROR) {
        res.status(409).send(rows.ERROR);
        return;
    }
    var idMode = rows.insertId;
    if (! idMode) {
        res.status(500).send('ID null after insert');
    }

    var mode = req.body;
    mode.idMode = idMode;
    res.status(200).json(mode);
	} catch (err){
	    res.status(500).json(err);
	    return;
	}
});

module.exports=router;