const express = require('express');
const scenarioRoutes = require('./scenarios');
const sensorRoutes = require('./sensors');

const router = new express.Router();    // eslint-disable-line new-cap

router.use('/scenarios', scenarioRoutes);

router.use('/sensors', sensorRoutes);

module.exports = router;
