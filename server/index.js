'use strict';

require('babel-register');

const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(http);
const envConfig = require('../env/env.config');
const socketConfig = require('./socket');
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

io.on('connection', socket => {
    socketConfig(socket);
});

app.use('/api', router);

app.post('/emulate', (req, res) => {
    io.emit(req.body.eventName, JSON.parse(req.body.eventData));
    console.log(`[socket.io] ${req.body.eventName}: ${req.body.eventData}`); // eslint-disable-line
    res.redirect('/');
});

const staticDir = process.env.RELEASE ? envConfig.dist.dir : path.join(__dirname, '/');
const hostArgs = process.env.RELEASE
    ? [process.env.PORT]
    : [envConfig.mockServer.port, envConfig.mockServer.host];

app.use(express.static(staticDir));
http.listen(...hostArgs, () => {
    console.log(`server listening on ${hostArgs.toString()}`); // eslint-disable-line
});
