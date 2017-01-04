'use strict';

const winston = require('winston');

module.exports = new winston.Logger({
  level: process.env.LOGGING_LEVEL || 'info',
  transports: [
    new (winston.transports.Console)(),
  ],
});