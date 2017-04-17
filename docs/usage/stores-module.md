# Stores Module

A stores module is basically a store for your stores. It's a good idea to have this so that you have a centralised place where all your models and collections live. Your stores module should live at `stores/index.js` and might look something like this

```js
export default {
  // models
  user: new User(),
  post: new Post(),
  comment: new Comment(),
  // collections
  users: new Users(User),
  posts: new Posts(Post),
  comments: new Comments(Comment)
};
```

You can then simply `import` the registry when you need to `fill` any store with data.

