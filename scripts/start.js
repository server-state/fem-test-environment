#!/usr/bin/env node
const cli = require('cli');

const packageJSON = require('../package.json');
// comment out to enable debug output (temporarily)
cli.enable('status', 'version', 'status');
cli.setApp(packageJSON.name + " (development only)", packageJSON.version);

const devServer = require('./dev-server');

devServer(); // use the default empty cbm
