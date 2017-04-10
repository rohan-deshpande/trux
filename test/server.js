const path = require('path');
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

export const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

export const endpoints = {
  'profile': `${endpoint}/profile`,
  'posts': `${endpoint}/posts`,
  'comments': `${endpoint}/comments`,
  'auth': `${endpoint}/profile/auth`
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
    server.get('/profile/auth', (req, res) => {
      res.writeHead(200, 'OK', { 'Authorization': token });
      res.end(JSON.stringify(schema.profile));
    });

    // use router
    server.use(router);
  });
}

export function stopServer() {
  connection.close(() => {
    fs.unlinkSync(db);
  });
}
