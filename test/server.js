const path  = require('path');
const jsonServer = require('json-server');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
const protocol = 'http';
const host = 'localhost';
const port = 3000;
const endpoint = `${protocol}://${host}:${port}`;

export default function serve(middlewares) {
  server.listen(port, () => {
    // set middlewares
    server.use(middlewares);

    // setup the body-parser for POST, PUT & PATCH requests
    server.use(jsonServer.bodyParser);

    // set test routes
    // todo

    // use router
    server.use(router);
  });
}
