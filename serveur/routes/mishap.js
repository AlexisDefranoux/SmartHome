const dbUtils = require('../db/utils');
const placeUtil = require ('../db/placeUtil');
var express = require('express');
var router = express.Router();
const ioUtils = require('../io/ioUtils');

router.get("/", async (req, res) => {
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM mishap');
        res.status(200).json(queryRows);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    var id = req.params.id;
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM mishap WHERE idMishap = ?', [id]);
        if (queryRows.length < 1){
            res.status(404).send();
        } else {
            res.status(200).json(queryRows[0]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/user/:userid", async (req, res) => {
    var userid = req.params.userid;
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT DISTINCT m.* FROM mishap m, user u WHERE ((SELECT role FROM user WHERE ? = idUser) = 1) OR (? = m.idUser) OR (m.idMishap IN (SELECT DISTINCT idMishap FROM task WHERE idUser = ? OR idTask IN (SELECT idTask from recipient WHERE idUser = ?))) ORDER BY m.createDate DESC', [userid, userid, userid, userid]);
        res.status(200).json(queryRows);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/search/:text", async (req, res) => {

    var all = decodeURI(req.params.text);
    console.log(all);
    var text = '%'+all.split("|")[0]+'%';
    var id = parseInt(all.split("|")[1]);
    console.log(id);
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT DISTINCT m.* FROM mishap m, user u WHERE (UPPER(m.description) LIKE ? OR m.idUser IN (SELECT idUser FROM user WHERE UPPER(name) LIKE ?) OR m.idPlace IN (SELECT idPlace FROM place WHERE UPPER(name) LIKE ?)) AND (((SELECT role FROM user WHERE ? = idUser) = 1) OR (? = m.idUser) OR (m.idMishap IN (SELECT DISTINCT idMishap FROM task WHERE idUser = ? OR idTask IN (SELECT idTask from recipient WHERE idUser = ?)))) ORDER BY m.createDate DESC', [text.toUpperCase(), text.toUpperCase(), text.toUpperCase(), id, id, id, id]);
        if (queryRows.length < 1){
            res.status(404).send();
        } else {

            res.status(200).json(queryRows);
        }
    } catch (err) {
      console.error(err);
        res.status(500).json(err);
    }
});


router.post("/", async (req, res) => {
    var description = req.body.description;
    var idPlace = req.body.idPlace;
    var createDate = req.body.createDate;
    var idSeverity = req.body.idSeverity;
    var idUser = req.body.idUser;
    var resolveDate = req.body.resolveDate;
    var mishapDate = req.body.mishapDate;
    var idMode = req.body.idMode;

    if (!(description && idPlace && createDate && idSeverity && idUser && mishapDate)){
        console.log("description "+description+" idPlace "+idPlace+" createDate "+createDate+
            " idSeverity "+idSeverity+" idUser "+idUser+" mishapDate "+mishapDate);
        res.status(400).send("At least one parameter is missing");
        return;
    }
    if (! (typeof description == 'string' && typeof idPlace == 'number' && typeof idSeverity == 'number' && typeof idUser == 'number' && typeof mishapDate == "string", typeof createDate == "string")){
        res.status(400).send("At least one parameter is of bad type");
        return;
    }

    try {
        var mishapDate = dbUtils.DateToSqlDate(mishapDate);
    } catch(err){
        res.status(500).json(mishapDate+"mishap");
        return;
    }
    try {
            createDate = dbUtils.DateToSqlDate(createDate);
            if(resolveDate != null)
                resolveDate = dbUtils.DateToSqlDate(resolveDate);
    } catch(err){
        res.status(500).json(createDate+"create");
        return;
    }


    try {
        const [rows, fields] = await req.db.execute('INSERT INTO mishap values(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [description, idPlace, createDate, idSeverity, 1, idUser, resolveDate, mishapDate, idMode]);
        if (rows.ERROR) {
            res.status(409).send(rows.ERROR);
            return;
        }
        var idMishap = rows.insertId;
        if (! idMishap) {
            res.status(500).send('ID null after insert');
        }

        var mishap = req.body;
        mishap.idMishap = idMishap;
        console.log(req.MQTT != undefined);
        ioUtils.triggerMQTT(req.MQTT, req.db, req.trasformConsigne);
        // req.MQTT.emit("trigger_consignes");
        res.status(200).json(mishap);
    } catch (err){
        res.status(500).json(err);
        return;
    }

});


router.put("/setDone", async (req, res) => {
    var id = req.body.idMishap;
    try {
        let [ queryRows, queryFields ] = await req.db.query('UPDATE mishap SET idState = 3 WHERE idMishap = ?', [id]);
        if (queryRows.length < 1){
            res.status(404).send();
        } else {
            res.status(200).json(queryRows[0]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getByUserAndNotDone/:id", async (req, res) => {
        var userid = req.params.userid;
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT DISTINCT * FROM mishap WHERE ? = idUser AND idState != 3 ORDER BY createDate ASC', [userid, userid, userid, userid]);
        if(queryRows.length < 1) {
            res.status(404).send();
        }
        res.status(200).json(queryRows[0]);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/iotMishap", async (req, res) => {
    const token = req.body.token;
    const date = req.body.date;
    const room = req.body.room;

    if(! token || !date || !room){
        res.status(400).send();
        console.log(req.body);
        return;
    }

    try {
        var realDate = dbUtils.DateToSqlDate(date);
        
        var idPlace = await dbUtils.getPlaceByLabel(room, req.db);
        if(idPlace == null) res.status(404).send();
        console.log(idPlace);
        
        let [ queryRows, queryFields ] = await req.db.query(
            "insert into mishap values (NULL, ?, ?, ?, 2, 1, 6, NULL, ?, NULL)",
        [token, idPlace, realDate, realDate]
        );
        var idMishap = queryRows.insertId;
        if (! idMishap) {
            res.status(500).send('ID null after insert');
            return;
        }
        console.log(req.MQTT != undefined);
        ioUtils.triggerMQTT(req.MQTT, req.db, req.trasformConsigne);
        // req.MQTT.emit("trigger_consignes");
        res.status(200).send();
    } catch (err){
        console.error(err);
        res.status(500).json(err);
    }
});

router.put("/iotMishap", async (req, res) => {
    const token = req.body.token;
    const room = req.body.room;
    try {
        //var realDate = dbUtils.DateToSqlDate(date);
        
        var idPlace = await dbUtils.getPlaceByLabel(room, req.db);
        if(idPlace == null) res.status(404).send();

        let [ querRowsSelect, queryFieldsSelect] = await req.db.query(
            "select idMishap from mishap where idPlace = ? and description like ? and idState <> 3",
            [idPlace, '%'+token+'%']
        );
        if(querRowsSelect.length < 1) {
            res.status(404).send();
            return;
        }

        var idMishap = querRowsSelect[0].idMishap;
        console.log("idMishap: "+idMishap);
        let [ queryRows, queryFields ] = await req.db.query(
            "UPDATE mishap SET idState = 3 WHERE idMishap = ? ",
            [idMishap]
        );
        console.log(req.MQTT != undefined);
        ioUtils.triggerMQTT(req.MQTT, req.db, req.trasformConsigne);
        // req.MQTT.emit("trigger_consignes");
        res.status(200).send();
    } catch (err) {
        console.error(err);
    }
});

module.exports=router;

