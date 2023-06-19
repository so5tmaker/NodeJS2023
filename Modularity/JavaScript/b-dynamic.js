'use strict';

const promise = import('node:events'); // dynamic import in common js modules, await does not work here
console.log({ promise });

promise.then((events) => {
  console.log({ defaultMaxListeners: events.defaultMaxListeners });
});
