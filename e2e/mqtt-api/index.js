'use strict';

const mqtt = require('mqtt');

const envConfig = require('../../env.config');

let MQTTclient;

module.exports = {
    /*
     * Method for init mqtt client
    */
    init() {
        MQTTclient = mqtt.connect({
            host: process.env.E2E_MQTT_HOSTNAME,
            port: process.env.E2E_MQTT_PORT,
            auth: `${process.env.E2E_MQTT_USERNAME}:${process.env.E2E_MQTT_PASSWORD}`
        });
    },

    /*
     * Method for publish message to mqtt chanel
     * param {String} device - name of device
     * param {String} message - massage
     *
     * Example in your e2e tests:
     * browser.MQTT.publish('distance1', '700');
    */
    publish(device, message) {
        MQTTclient.publish(`/smart-home/out/${device}`, message);
    }
};
