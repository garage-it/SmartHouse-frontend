const express = require('express');
const scenarioRoutes = require('./scenarios');

const router = new express.Router();    // eslint-disable-line new-cap

router.use('/scenarios', scenarioRoutes);

module.exports = router;
