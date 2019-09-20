var express=require('express');
var router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).send("ok")
});

module.exports=router;