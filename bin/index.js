#! /usr/bin/env node

const path = require('path');
const exec = require('shelljs').exec;
const cwd = path.join(__dirname, '..');

exec('npm run client', {cwd});
