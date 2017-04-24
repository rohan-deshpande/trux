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
components/
  connectors/
    index.js
    User.js
    Users.js
    Post.js
    Posts.js
    Comment.js
    Comments.js
  nodes/
    User/
      Name.js
      Bio.js
      List.js
    Post/
      Title.js
      Body.js
      Date.js
      Form.js
      List.js
    Comment/
      Body.js
      Date.js
      Form.js
      List.js
  ProfilePic.js
  Header.js
  Footer.js
  App.js
index.js
```

Some notes about this structure:

* `components` is where **all** your components should sit, we break them down into categories within this directory
* `components/connectors` is where any component that needs to receive store updates should exist. The `index.js` file here should export all your connectors.
* `components/nodes` is where any component that receives store data as props should sit. The `index.js` file here should export all your nodes
* `stores/models/index.js` is your `models` module and should export all model classes
* `stores/collections/index.js` is your `collections` module and should export all collection classes
* `stores/index.js` is your [stores module](/usage/stores-module.md) it should export instantiated stores
