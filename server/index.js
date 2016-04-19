'use strict';

const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(http);
const mock = require('../env/env.mock.config');
const routesConfig = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

io.on('connection', socket => {
    routesConfig(socket);
});

app.post('/emulate', (req, res) => {
    io.emit(req.body.eventName, JSON.parse(req.body.eventData));
    console.log(`[socket.io] ${req.body.eventName}: ${req.body.eventData}`); // eslint-disable-line
    res.redirect('/');
});

app.get('/sensor/api/sensor/get/:id', (req, res) => {
    console.log(req.params.id);
    res.json({
        id: req.params.id,
        name: 'mock',
        type: 'mock',
        description: 'mock',
        active: true
    });
});

app.post('/sensor/api/sensor/save', (req, res) => {
    console.log(req);
    res.json(req.body);
});

app.use(express.static(path.join(__dirname, '/')));

http.listen(mock.port, mock.host, () => {
    console.log(`server listening on port ${mock.port}`); // eslint-disable-line
});
