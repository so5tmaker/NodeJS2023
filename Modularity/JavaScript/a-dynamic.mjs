const promise = import('node:events'); // import works as a function
console.log({ promise });

promise.then((events) => {
  console.log({ defaultMaxListeners: events.defaultMaxListeners });
});

const events = await import('node:events');
console.log({ defaultMaxListeners: events.defaultMaxListeners });
