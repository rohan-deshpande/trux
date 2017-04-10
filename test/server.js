const path  = require('path');
const fs = require('fs');
const jsonServer = require('json-server');
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
const protocol = 'http';
const host = 'localhost';
const port = 3000;
const endpoint = `${protocol}://${host}:${port}`;
const db = path.join(__dirname, 'db.json');
const schema = {
  'posts': [
    {
      'title': 'trux',
      'author': 'rohaneshpande',
      'id': 1
    }
  ],
  'comments': [
    {
      'id': 1,
      'body': 'some comment',
      'postId': 1
    }
  ],
  'profile': {
    'name': 'rohandeshpande'
  }
};

let connection;

export const endpoints = {
  'profile': `${endpoint}/profile`,
  'posts': `${endpoint}/posts`,
  'comments': `${endpoint}/comments`,
};

export function startServer() {
  fs.writeFileSync(db, JSON.stringify(schema, null, 2));

  const router = jsonServer.router(db);

  connection = server.listen(port, () => {
    // set middlewares
    server.use(middlewares);

    // setup the body-parser for POST, PUT & PATCH requests
    server.use(jsonServer.bodyParser);

    // set test routes

    // use router
    server.use(router);
  });
}

export function stopServer() {
  connection.close(() => {
    fs.unlinkSync(db);
  });
}
