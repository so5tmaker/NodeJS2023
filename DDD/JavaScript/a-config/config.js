'use strict';

module.export = {
  static: {
    port: 8000,
  },
  api: {
    port: 8001,
  },
  RUN_OPTIONS: {
    timeout: 5000,
    displayErrors: false,
  },
  db: {
    host: '127.0.0.1',
    port: 5432,
    database: 'example',
    user: 'marcus',
    password: 'marcus',
  },
  logger: {
    DATE_TIME_LENGTH: 19,
    COLORS: {
      info: '\x1b[1;37m',
      debug: '\x1b[1;33m',
      error: '\x1b[0;31m',
      system: '\x1b[1;34m',
      access: '\x1b[1;38m',
    }
  }
}
