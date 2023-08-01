const db = require('../db.js');

module.exports = {
  async say(message) {
    console.log({ message });
    return { status: 'ok' };
  },
};
