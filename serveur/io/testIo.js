const placeUtil = require ('../db/placeUtil');
var express = require('express');
var router = express.Router();
const requestIo = require('./requestsIo');
const weather = require('./weather');

router.get("/askedconsignes", async (req, res) => {
    var obj = await requestIo.askedConsignes(req.db);
    console.log(obj);
    res.status(200).json(obj);
});
router.get("/", async (req, res) => {
    console.log(req.sockets);
    var obj = await requestIo.getConsignes(req.db);
    res.status(200).json(obj);
});

router.get("/weather", async (req, res) =>{
    console.log("weather");
    res.status(200).json(await weather.transformConsigne(req.db));
});

module.exports=router