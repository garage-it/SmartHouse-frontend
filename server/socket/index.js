'use strict';

const sensorEvents = require('./sensor-events');

module.exports = socket => {
    socket.on('example/rest', (data, clientCb) => {
        console.log(data); // eslint-disable-line
        clientCb(Object.assign({}, data, {
            source: 'server'
        }));
    });

    sensorEvents.initSensorEvents(socket);
};

