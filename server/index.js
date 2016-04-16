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

io.on('connection', socket => {
    _exampleRest(socket);
});

app.post('/emulate', (req, res) => {
    io.emit(req.body.eventName, JSON.parse(req.body.eventData));
    console.log(`[socket.io] ${req.body.eventName}: ${req.body.eventData}`);
    res.redirect('/');
});

app.use(express.static(path.join(__dirname, '/')));

http.listen(env.server.mock.port, env.server.host, () => {
    console.log(`server listening on port ${env.server.mock.port}`);
});

function _exampleRest(socket) {
    /* example rest */
    socket.on('example/rest', (data, clientCb) => {
        console.log(data);
        data.source = 'server';
        clientCb(Object.assign({}, data));
    });
}