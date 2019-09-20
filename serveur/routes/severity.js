var express = require('express');
var router = express.Router();


router.get("/", async (req, res) => {
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM severity');
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
        let [rows, fields] =  await req.db.query('SELECT * FROM severity where idSeverity = ?', id);
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

module.exports = router;