# GraphQL

Even though Trux was originally designed with [REST](/usage/REST.md) in mind, it will work just as well out of the box with [GraphQL](http://graphql.org/) [served over HTTP](http://graphql.org/learn/serving-over-http/).

## GET and POST only

Since GraphQL server only supports `GET` and `POST` requests, some of the Trux methods for interacting with remote data won't really work as intended. 

For requesting model and collection data, you will still be able to use the `fetch` method, simply pass your prepared `query` as an argument. 

For example:

```js
user.fetch(encodeURI('?query=user(id: "1")');
```

For model mutations, you'll need to use the `update` method with the `method` option set to `POST` like so

```js
user.update({
    data: {
      "query": "...",
      "operationName": "...",
      "variables": { "myVariable": "someValue", ... }        
    },
    method: 'POST'
});
``` 