'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const async = require("async");
const mysql = require('mysql2/promise');
const mqtt = require('mqtt');
const config = require('./db/config.js');
const weather = require('./io/weather');

const app = express();
const server = require('http').createServer(app);  
const login = require('./routes/user');
const messages = require('./routes/messages');
const mishap = require('./routes/mishap');
const severity = require('./routes/severity');
const place = require('./routes/place');
const state = require('./routes/state');
const comment = require('./routes/task');
const consigne = require('./routes/consigne');
const mode = require('./routes/mode');
const configIo = require('./io/ioConfig');
const ioUtils = require('./io/ioUtils');
const testIo = require('./io/testIo');
const test = require('./routes/test');


app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({}));
app.use(morgan('dev'));

// async function start (){
//   db = await mysql.createConnection(config);
//   const io = socketio(server, {path: "/Websocket"});
//   configIo(io, sockets, db);

  
// }start();

async function configapp() {
  app.db = await mysql.createConnection(config);
  app.trasformConsigne = await weather.transformConsigne(app.db, app);
  console.log("transform consigne :"+app.transformConsigne);
  app.MQTT = mqtt.connect("mqtt://localhost:1883");
  configIo(app.MQTT, app.db, app.trasformConsigne);

  
  ioUtils.setAutoTriggerAndRefresh(app);
  

  //TODO chage this pls
  //app.mqtt = await configMQTT( mqtt(server, {path: "/Websocket"}), app.sockets, app.db);

  app.use(async (req, res, next) => {
    if (! app.db) {
      app.db = await mysql.createConnection(config);
      // console.log("before io");
      // //app.io = await configIo( socketio(server, {path: "/Websocket"}), app.sockets, app.db);
      // console.log("after io");
      // instead of .createConnection, you can also use .createPool

      app.db = await mysql.createConnection(config);
      app.MQTT = mqtt.connect("mqtt://localhost:1883")
      app.trasformConsigne = weather.transformConsigne(app.db, app); 
      await configIo(app.MQTT, app.db, app.trasformConsigne);
    }
    req.sockets = app.sockets;
    req.db = app.db;
    req.MQTT = app.MQTT;
    req.trasformConsigne = app.trasformConsigne;
    

    //console.log(app.io);
    return next();
  });

  app.use('/messages',messages);
  app.use('/user',login);
  app.use('/severity', severity);
  app.use('/mishap', mishap);
  app.use('/place', place);
  app.use('/state',state);
  app.use('/task',comment);
  app.use('/consigne',consigne);
  app.use('/mode',mode);
  app.use('/test', test);

  app.use("/testIo", testIo);
  server.listen(process.env.PORT || 3000, 0, () => {
    console.log('[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!');
  });


}configapp();




// const server = app.listen(process.env.PORT || 3000, () => {
//     console.log('[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!');
// });