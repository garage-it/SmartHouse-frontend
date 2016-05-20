const express = require('express');

const scenarioRouter = new express.Router();

scenarioRouter.all('/:id', (req, res) => {
    res.json(require('./scenario.json'));
});

scenarioRouter.route('/')
    .get((req, res) => {
        res.json(require('./scenarios.json'));
    })
    .post((req, res) => {
        res.json(require('./scenario.json'));
    });

module.exports = scenarioRouter;
