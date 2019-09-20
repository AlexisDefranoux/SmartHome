var express = require('express');
var router = express.Router();


router.get("/", async (req, res) => {
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM task');
        res.status(200).json(queryRows);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    var id = Number(req.params.id);
    if (! id || typeof id != "number") {
        res.status(400).send('bad id type or value');
        return;
    }
    try{
        let [rows, fields] =  await req.db.query('SELECT * FROM task where idMishap = ?', id);
            res.status(200).json(rows);
    } catch(err) {
        console.log
        res.status(500).json(err);
    }
});

router.get('/task/:id', async (req, res) => {
    var id = Number(req.params.id);
    if (! id || typeof id != "number") {
        res.status(400).send('bad id type or value');
        return;
    }
    try{
        let [rows, fields] =  await req.db.query('SELECT * FROM task where idTask = ?', id);
            res.status(200).json(rows[0]);
    } catch(err) {
        console.log
        res.status(500).json(err);
    }
});

router.get('/recipient/:id', async (req, res) => {
    var id = Number(req.params.id);
    if (! id || typeof id != "number") {
        res.status(400).send('bad id type or value');
        return;
    }
    try{
        let [rows, fields] =  await req.db.query('SELECT * FROM user u JOIN recipient r ON r.idUser = u.idUser where idTask = ?', id);
        res.status(200).json(rows);
    } catch(err) {
        console.log
        res.status(500).json(err);
    }
});

module.exports = router;