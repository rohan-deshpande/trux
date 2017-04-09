const path  = require('path');
const fs = require('fs');
const jsonServer = require('json-server');
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
const protocol = 'http';
const host = 'localhost';
const port = 3000;
const endpoint = `${protocol}://${host}:${port}`;
const DB_PATH = path.join(__dirname, 'db.json');
const DB = {
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
  'post': `${endpoint}/posts/1`,
  'putPost': `${endpoint}/posts/1`,
  'profile': `${endpoint}/profile`
};

export function startServer() {
  fs.writeFileSync(DB_PATH, JSON.stringify(DB, null, 2));

  const router = jsonServer.router(DB_PATH);

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
    fs.unlink(DB_PATH, (error) => {
      if (error) console.log(error);
    });
  });
}
