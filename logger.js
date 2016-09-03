'use strict';

const winston = require('winston');

const logger = new winston.Logger({
  level: process.env.LOGGING_LEVEL | 'info',
  transports: [
    new (winston.transports.Console)(),
  ],
});

process.on('uncaughtException', (err) => {
  logger.error(`Unexpected error: ${err}`);
  logger.error(err);
  process.exit(1);
});

module.exports = logger;