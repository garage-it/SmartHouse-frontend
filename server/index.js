'use strict';

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const port = 9000;
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

io.on('connection', function(socket){
    console.log('socket.io: a user connected');
});

app.post('/emulate', (req, res) => {
    io.emit(req.body.eventName, JSON.parse(req.body.eventData));
    res.redirect('/');
});

app.use(express.static(path.join(__dirname, '/')));

app.get('/dashboard', () => {

});

http.listen(port, () => {
    console.log(`server listening on port ${port}`);
});