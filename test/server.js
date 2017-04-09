const path  = require('path');
const fs = require('fs');
const jsonServer = require('json-server');
const DB_DEV_PATH = path.join(__dirname, 'db.dev.json');
const DB_PROD_PATH = path.join(__dirname, 'db.prod.json');
const DB_DEV = require(DB_DEV_PATH);
const DB_PROD = require(DB_PROD_PATH);
const router = jsonServer.router(DB_DEV_PATH);
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
const protocol = 'http';
const host = 'localhost';
const port = 3000;
const endpoint = `${protocol}://${host}:${port}`;
export const endpoints = {
  'post': `${endpoint}/posts/1`,
  'putPost': `${endpoint}/posts/1`,
  'profile': `${endpoint}/profile`
};
export function serve() {
  server.listen(port, () => {
    // set middlewares
    server.use(middlewares);

    // setup the body-parser for POST, PUT & PATCH requests
    server.use(jsonServer.bodyParser);

    // set test routes

    // use router
    server.use(router);
  });
}

export function restoreData() {
  fs.writeFile(DB_DEV_PATH, JSON.stringify(DB_PROD, null, 2), (error) => {
    if (error) console.log(error);
  });
}
