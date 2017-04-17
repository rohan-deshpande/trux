# REST

Trux was designed with a REST API in mind and is already wired up to work with one out of the box. All you will need to do is define your resource routes for your stores and you should be ready to go.

**Note!** Trux is designed to work with a JSON based API, if your API does not produce/consume JSON, you might need to build custom request methods into your stores.

## Resources

Trux models and collections both inherit the `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`, properties which are defined in their constructors from the base `Store` class. By default, these are just empty strings, but you can easily set these at any time, or create methods to do so for you.  Here's an example

```js
import stores from './stores';
import { API_ENDPOINT } from './api/constants';

stores.posts.GET = `${API_ENDPOINT}/posts/${stores.user.id}`;
store.posts.fetch();
```



