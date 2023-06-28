'use strict';

class Entity { }

const fn = (x) => x;

const collection = new Map();

module.exports = { Entity, fn, collection };

// Modules: CommonJS modules - https://nodejs.org/api/modules.html
// Modules: ECMAScript modules - https://nodejs.org/api/esm.html
// module.createRequire(filename) - https://nodejs.org/api/module.html#modulecreaterequirefilename
// Modules: Packages - https://nodejs.org/api/packages.html
// VM (executing JavaScript) - https://nodejs.org/api/vm.html

class DemoClass {
  constructor() {
    this.message = 'Hello world';
  }
  printMessage = () => console.log(this.message);
}

const demo = new DemoClass;
const { printMessage } = demo;
printMessage();
