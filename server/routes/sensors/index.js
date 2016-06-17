const express = require('express');
const mockedSensors = require('./sensors.json');

const sensorsRouter = new express.Router();

sensorsRouter.get('/:id', (req, res) => {
    res.json(mockedSensors[1]);
});

sensorsRouter.delete('/:id', (req, res) => {
    res.json(mockedSensors[1]);
});

sensorsRouter.put('/:id', (req, res) => {
    res.json(mockedSensors[1]);
});

sensorsRouter.route('/')
    .get((req, res) => {
        // res.json([]);
        res.json(mockedSensors);
    })
    .post((req, res) => {
        res.json(mockedSensors);
    });

module.exports = sensorsRouter;
