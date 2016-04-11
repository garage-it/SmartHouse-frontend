'use strict';

const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const env = require('../env/env.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

io.on('connection', function(socket){
    console.log('socket.io: connected');
});

app.post('/emulate', (req, res) => {
    io.emit(req.body.eventName, JSON.parse(req.body.eventData));
    res.redirect('/');
});

app.use(express.static(path.join(__dirname, '/')));

http.listen(env.server.mock.port, env.server.host, () => {
    console.log(`server listening on port ${env.server.mock.port}`);
});