# Structure

Here is what the structure for a blog built with Trux might look like:

```bash
stores/
    models/
        User.js
        Post.js
        Comment.js
    collections/
        Users.js
        Posts.js
        Comments.js
    registry.js
connectors/
    user/
        UserConnector.js
        UsersConnector.js
    post/
        PostConnector.js
        PostsConnector.js
    comment/
        CommentsConnector.js
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



