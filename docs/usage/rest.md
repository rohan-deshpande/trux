# REST

Trux was designed with a REST API in mind and is already wired up to work with one out of the box. All you will need to do is define your resource routes for your stores and you should be ready to go.

## JSON based

Trux is designed to work with a JSON based API, if your API does not produce/consume JSON, you might need to build custom request methods into your stores.

## Resources

Trux models and collections both define `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` REST endpoint properties in their constructors. By default, these are just empty strings, but you can easily set these at any time.  Here's an example

```js
import stores from './stores';
import { URL } from './api';

stores.posts.GET = `${URL}/posts/${stores.user.id}`; // resource for all of the user's posts
store.posts.fetch();
```

This will fetch all of the user's posts and fill the `posts` collection with `post` models. This isn't really a good real world example though, so for more on this see [handling dependencies](#handling-dependencies) below.

You can also override the REST endpoints in your constructor like so

```js
import { URL } from '../api';

class Post extends Model {
  constructor(data) {
    super(data);

    this.GET = `${URL}/post/${this.id}`;
    // ... you can define other resource routes too
  }

  get id() {
    return this.data.id;
  }
}
```

This way, when you fill a collection with models, the endpoints will all be set up for you, automagically.

## Handling dependencies

What if your resource needs an `id` but you haven't authenticated a user yet? In this instance, defining your REST endpoints on demand would be cumbersome, and defining them in the constructor would be impossible.



