'use strict';



const transport = {};

transport.http = (url) => (structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) => new Promise((resolve, reject) => {
        fetch(`${url}/api/${name}/${method}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ args }),
        }).then((res) => {
          const { status } = res;
          if (status !== 200) {
            reject(new Error(`Status Code: ${status}`));
            return;
          }
          resolve(res.json());
        });
      });
    }
  }
  return Promise.resolve(api);
};

transport.ws = (url) => (structure) => {
  const socket = new WebSocket(url);
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) => new Promise((resolve) => {
        const packet = { name: name, method: method, args };
        socket.send(JSON.stringify(packet));
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          resolve(data);
        };
      });
    }
  }
  return new Promise((resolve) => {
    socket.addEventListener('open', () => resolve(api));
  });
};

const scaffold = (url) => {
  const protocol = url.startsWith('ws:') ? 'ws' : 'http';
  return transport[protocol](url);
};

(async () => {
  const api = await scaffold('http://localhost:8001')({
    user: {
      create: ['record'],
      read: ['id'],
      update: ['id', 'record'],
      delete: ['id'],
      find: ['mask'],
    },
    country: {
      read: ['id'],
      delete: ['id'],
      find: ['mask'],
    },
    talks: {
      say: ['message'],
    }
  });
  const data = await api.talks.say('hello');
  console.dir({ data });
})();
