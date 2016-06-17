'use strict';

const mqtt = require('mqtt');

const envConfig = require('../../env.config');

let MQTTclient;

module.exports = {
    init() {
        MQTTclient = mqtt.connect({
            host: 'm21.cloudmqtt.com',
            port: 12787,
            auth: `wvzaejdb:-rewPZuV-ilM`
        });


        // MQTTclient = mqtt.connect({
        //     host: config.mqtt.hostname,
        //     port: config.mqtt.port,
        //     auth: `${config.mqtt.username}:${config.mqtt.password}`
        // });
    },

    publish(device, message) {
        MQTTclient.publish(`/smart-home/out/${device}`, message);
    }
};
