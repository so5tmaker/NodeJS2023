'use strict';

const path = require('node:path');

const pino = require('pino');

class Logger {
  constructor(logPath) {
    const date = new Date().toISOString().substring(0, 10);
    const filePath = path.join(logPath, `${date}.log`);
    const customLevels = {
      info: 20,
    };
    const loggerOptions = {
      customLevels,
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: true,
        },
      },
      dest: filePath, // omit for stdout
      minLength: 4096, // Buffer before writing
      sync: false // Asynchronous logging
    };
    this.pino = pino(loggerOptions);
  }

  write(type = 'info', s) {
    this.pino[type](s);
  }

  log(...args) {
    this.write('info', ...args);
  }

  dir(...args) {
    this.write('info', ...args);
  }

  debug(...args) {
    this.write('debug', ...args);
  }

  error(...args) {
    console.log(args);
    this.write('error', ...args);
  }

  system(...args) {
    this.write('system', ...args);
  }

  access(...args) {
    this.write('access', ...args);
  }
}

module.exports = new Logger('./log');








