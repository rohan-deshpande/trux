# Collection

A Trux `Collection` is a store for an array of models. They are containers for a many items of data and thus are perfect for rendering out lists of components such as cards, todos and posts etc.,.

Collections can only store one kind of model and you must tell it which model you plan to store within it upon instantiation. Like models, they inherit all properties and methods from the `Store` class but add a few extra methods as well.

Let's take a quick look at how to use a `Collection`

```js
import { Model, Collection } from 'trux';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';

// posts data
const posts = [
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
];

// create a custom model to pass to the collection
class Post extends Model {
  constructor(data) {
    super(data);
  }

  get id() {
    return this.data.id;
  }

  get title() {
    return this.data.title;
  }

  get content() {
    return this.data.content;
  }

  get author() {
    return this.data.author;
  }
}

// create a React component to render the data
class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.truxid = 'PostsList';
    this.props.posts.connect(this);
  }

  componentWillUnmount() {
    this.props.posts.disconnect(this);
  }

  storeDidUpdate() {
    this.forceUpdate();
  }

  render() {
    return this.posts.models.map((post, i) => {
      return (
        <article key={post.id}>
          <header>
            {post.title}
          </header>
          <p>
            {post.content}
          </p>
          <small>
            {post.author}
          </small>
        </article>
      );
    });
  }
}

// create a collection and set its model constructor
const Posts = new Collection(Post);

// fill the collection with data to be turned into models, the fill method will auto instantiate these
// objects, passing each of them to the model constructor passed to the constructor and appending them
// to the collection's models array.
Posts.fill(posts);

// render the PostsList component into the #blog div and pass in the Posts collection as the posts prop.
render(<PostsList posts={Posts}, document.getElementById('blog'));
```

Now, some words about what's happening here. Basically we are creating a custom model through [extending](/usage/extending.md), setting this as the model that our `Posts` collection, will contain and then filling that collection with some data before passing it to a React component which will be rendered it into the DOM. The `Posts` collection's `fill` method will take care of instantiating `Post` models for us and pushing them into the `Posts.models` array.

One thing to be aware of - when a model is instantiated as part of a collection, it has a reference to that collection set as a property; `.collection`. When the model's data is mutated and its `persist` method is called, Trux performs a check first to see if that model is part of a collection. If it is, then the collection's `persist` method is called instead, effectively re-rendering the components connected to _it_ rather than any connected to the model.

## Sorting

It's recommended that you let your JavaScript app handle sorting for you unless you wish to `fetch` your collection every time a sortable property is mutated. I recommend the awesome library [`thenby`](https://www.npmjs.com/package/thenby)which will allow you to create a `sort` method on your collection very easily eg.,

```js
import { Post } from '../models';

class Posts extends Collection {
    constructor() {
        super(Post);
    }
    
    sort() {
        this.models.sort(
            firstBy((a, b) => a.created_at - b.created_at)
            .thenBy((a, b) => a.modified_at - b.modified_at);
        );
        
        return this;
    }
}
```

## Learn more

* Collection properties
* Collection methods



