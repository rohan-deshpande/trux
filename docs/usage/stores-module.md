# Stores Module

A stores module is basically a store for your stores. Technically speaking, you could think of it as your **super** store, or your _single source of truth_. It's a good idea to have this so that you have a centralised place where all your models and collections live. Your stores module should live at `stores/index.js` and might look something like this

```js
import { User, Post, Comment } from './models';
import { Users, Posts, Comments } from './collections';

export default {
  user: new User(),
  post: new Post(),
  comment: new Comment(),
  users: new Users(User),
  posts: new Posts(Post),
  comments: new Comments(Comment)
};
```

Then you can simply `import` this module whenever you need access to a store;

```js
import stores from './stores';

stores.posts.fill([
  {
    'id': 1,
    'title': 'Taters',
    'content': 'Boil \'em mash \'em stick \'em in a stew',
    'author': 'Samwise Gamgee'
  },
  {
    'id': 2,
    'title': 'Balrog',
    'content': 'You shall not pass!',
    'author': 'Gandalf Greyhame',
  },
  {
    'id': 3,
    'title': 'Precious',
    'content': 'They stoles it from us! Filthy little Hobbitses!'
  },
]);
```
