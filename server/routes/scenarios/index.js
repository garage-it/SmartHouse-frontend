const express = require('express');

const scenarioRouter = new express.Router();

scenarioRouter.get('/', (req, res) => {
    res.json(require('./scenarios.json'));
});

module.exports = scenarioRouter;
