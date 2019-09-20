
const ioRequest = require("./requestsIo")
const weather = require('./weather');

const halfMinute = 30000;
const day = 86400000;


async function triggerMQTT (MQTT, db, transformConsignes=0) {
    if(! MQTT) { console.log("MQTT undefined"); return;}
    var obj = await ioRequest.getConsignes(db, transformConsignes);
    console.log("\nConsignes demandées : \n", obj);
    MQTT.publish("/ws/consignes", JSON.stringify(obj));
}
module.exports.triggerMQTT = triggerMQTT;

async function getNewTransformConsignes(app) {
    app.transformConsignes = await weather.transformConsigne(app.db, app);
}

function timeMQTT(app) {
    setTimeout(
        () => {triggerMQTT(app.MQTT, app.db, app.transformConsigne);timeMQTT(app);}
        ,halfMinute,
        []
    );
}

function timeWeather(app) {
    setTimeout(() => {getNewTransformConsignes(app);timeWeather(app)},day,[]);
}

module.exports.setAutoTriggerAndRefresh = function(app) {
    timeWeather()
    timeMQTT(app);
}