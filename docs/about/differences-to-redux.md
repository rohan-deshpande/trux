# Differences to Redux

Trux is quite different to Redux, so much so that it literally breaks all of its [three core principles](http://redux.js.org/docs/introduction/ThreePrinciples.html). Before you spit out your ristretto in disgust, let me say that I really, really like Redux. I think it is an elegant, awesome solution to application state management and if you are already invested in it, Trux might not be the right choice for you.

I do believe however that Redux forces developers to rethink solutions to things in a way that may, at times, seem slightly over-engineered. In order to work with it you may need extra libraries, such as [`react-router-redux`](https://github.com/reactjs/react-router-redux) if you wish to use React-Router and [`redux-form`](http://redux-form.com/6.6.3/) to manage the state of your forms with Redux. Asynchronous functionality added on top brings extra complexity with libraries such as [`redux-thunk`](https://github.com/gaearon/redux-thunk) and [`redux-saga`](https://github.com/redux-saga/redux-saga) to consider.

Trux offers an alternative approach that is geared towards simplicity and speed. You won't need any extra libraries or tools to get it working and conceptually, I feel it is quite easy to grasp.

## Multiple stores

In Trux, you will typically have multiple stores for data. Usually these stores are a representation of remote data in the client side of your app. For example, for a blog, you may have a `User` model, a `Post` model and a `Comment` model. Likewise you may also have a `Users` collection, `Posts` collection and `Comments` collection. These stores could be connected to various components.

**These stores** **are** **still the single source of truth** **for the data driven parts of your app**. However, Trux is fine with self managed state for certain components, such as forms.

## Protected mutability

Trux stores are mutable, but there's a catch - any time you mutate a store, it is expected that a validation occurs in your system to let you know if this change is allowed or not.

```js
console.log(User.name) // logs Frodo

Component.truxid = 'Profile'; // set the truxid for the component
Component.connect(User); // connect a component to the User store

User.name = 'Sam';
User.update(); // attempt to update the user's name in the remote store
```

It is expected here that the update request would hit some sort of validator on the server. If this validation fails, you will receive an error and Trux will immediately `restore` your model to its previous state. Connected components will re render back to their state before the mutation.

## Internal store changes

Changes to a model or collection's data should only ever happen through interactions with the store itself. Let's look at a simple `User` model

```js
class User extends Model {
  constructor(data) {
    super(data);
  }

  get name() {
    return this.data.name;
  }

  set name(name) {
    if (!name || !name.length) {
        throw new Error('You must supply a valid name');
    }

    this.data.name = name;
  }
}
```

In this example, you may change the `name` property of a `User` anywhere in your app by calling `User.name = 'new name'` and this will call the internal `set name` method of the model. Notice that you have customisable, context aware ways of ensuring that bad data does get injected into your store. Again, your API should always perform validation on any mutations as well.

