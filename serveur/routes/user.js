var express = require('express');
var router = express.Router();

/**
 * response ,username tocken
 * format res if succed {islogged: true, id: int, name: str, email: string, role: boolean}
 * if fail {islogged: false}
 **/
router.post("/", async (req, res) => {
    let email_value = req.body.email;
    let password_value = req.body.password;
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM user WHERE email = ? AND password = ?',[email_value, password_value]);
        if (queryRows.length < 1) {
            res.status(403).send();
            return;
        }else {
            var user = queryRows[0]
            user.password = undefined;
            res.status(200).json(user);
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    var id = req.params.id;
try {
    let [ queryRows, queryFields ] = await req.db.query('SELECT * FROM user WHERE idUser = ?', [id]);
    if (queryRows.length < 1){
        res.status(404).send();
    } else {
        res.status(200).json(queryRows[0]);
    }
} catch (err) {
    res.status(500).json(err);
}
});

router.get("/", async (req, res) => {
    try {
        let [ queryRows, queryFields ] = await req.db.query('SELECT id, name FROM user');
        res.status(200).json(queryRows);
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports=router;
