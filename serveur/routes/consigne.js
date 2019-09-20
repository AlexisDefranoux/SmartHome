var express = require('express');
var router = express.Router();
const util = require('../db/placeUtil');
const ioUtils = require('../io/ioUtils');


router.get('/:label', async (req, res) => {
    var label = Number(req.params.label);
    if (! label || typeof label != "string") {
        res.status(400).send('bad id type or value');
        return;
    }
    try{
        let [ queryRows, queryFields ] = await req.db.query('SELECT temperature FROM consigne c JOIN place p ON p.idPlace = c.idPlace WHERE p.label = ?', [label]);
        if (queryRows.length < 1){
            res.status(404).send();
        } else {
            res.status(200).json(queryRows[0]);
        }
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
});

router.put("/update", async (req, res) => {
	var label = req.body.label;
    var temperature = req.body.temperature;
    console.log(req.body);

    try {
        let [ queryRows, queryFields ] = await req.db.query('UPDATE consigne c JOIN place p ON p.idPlace = c.idPlace SET temperature = (select truncate(?, 2)) WHERE p.label = ?', [temperature, label]);
        if (queryRows.length < 1){
            res.status(404).send();
        } else {
            res.status(200).json(queryRows[0]);
            // req.MQTT.emit("trigger_consignes");
            ioUtils.triggerMQTT(req.MQTT, req.db, req.trasformConsigne);
        }
    } catch (err) {
    	console.error(err);
        res.status(500).json(err);
    }
});

module.exports=router;