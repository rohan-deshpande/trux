# Structure

Here is what the structure for a blog built with Trux might look like:

```bash
stores/
  models/
    User.js
    Post.js
    Comment.js
    index.js
  collections/
    Users.js
    Posts.js
    Comments.js
    index.js
  index.js
connectors/
  user/
    User.js
    Users.js
  post/
    Post.js
    Posts.js
  comment/
    Comments.js
nodes/
  user/
    UserName.js
    UserBio.js
  post/
    PostTitle.js
    PostBody.js
    PostDate.js
    PostForm.js
  comment/
    CommentBody.js
    CommentDate.js
    CommentForm.js
  ProfilePic.js
  Header.js
  Footer.js
App.js
index.js
```

Some notes about this structure:

* `stores/models/index.js` is your `models` module and should export all model classes
* `stores/collections/index.js` is your `collections` module and should export all collection classes
* `stores/index.js` is your [stores module](/usage/stores-module.md) it should export an object to store your instantiated stores



