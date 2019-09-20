const request = require("./requestsIo");
const ioUtils = require("./ioUtils")

function configSocket (socket, db) {
    socket.on('end', function (){
        socket.disconnect(0);
    });
}

function onconnect(socket, array, db) {
    configSocket(socket, array, db)
}

module.exports = async function (MQTT,db, transformConfig) {
    MQTT.on("connect", async () => {
        MQTT.publish("/ws/test", "HI");
        MQTT.emit("trigger_consignes");
        ioUtils.triggerMQTT(MQTT, db, transformConfig);
    })

}