# [Trux](https://github.com/rohan-deshpande/trux)

### `API ⇆ Trux ➝ UI`

Unidirectional data layer for reactive user interfaces.

> **T**ransforming **r**eactive **u**ser e**x**periences

[![Build Status](https://travis-ci.org/rohan-deshpande/trux.svg?branch=master)](https://travis-ci.org/rohan-deshpande/trux)

## Introduction

Trux is an easy-to-use, lightweight and effective way of managing mutable data for your client side JavaScript app.

With its focus placed on enabling the creation of fully customisable and effective bridges between your data and UI, Trux provides convenient and safe ways to mutate data and synchronise these changes with your components.

**With Trux, your data stores become the sources of truth for your app's data dependent user interfaces.**

Trux doesn't care how you structure your app, all you need to do is create some stores, connect components to them and watch it all work. While it was designed with React and a REST API in mind, it can also be used with Vue and GraphQL \(and probably other frameworks/patterns\) with little to no difference.

Want to learn more? Checkout the short guide below, the examples and the [API reference](http://rohandeshpande.com/trux) to get a better idea of how to use Trux.

## Installation

```bash
npm i -S trux
```

or

```bash
yarn add trux
```

## User Guide

Trux comes packed with two kinds of stores, `Trux.Model` and `Trux.Collection` which are designed to be extended for your own use cases. Let's take a look at how to use these stores.

### `Trux.Model`

A `Trux.Model` is a store that contains a single data object that you might want to broadcast to one or many components. Through extending, it can also contain various custom methods such as getters, setters and pretty much anything you like.

Trux models extend the base `Store` class and therefore inherit a number of methods and properties which make synchronising them with your UI very easy. Let's take a look at how to do that.

In this very simple example we're going to attach a React component to an out of the box Trux model.

```javascript
import Trux from 'trux';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';

// instantiate a model with some data. This data will be assigned to the message.data property.
const message = new Trux.Model({ 'message': 'hello world' });

class Message extends Component {

  /**
   * Pass the model in via props.
   *
   */
  static propTypes = {
    model: React.PropTypes.object.isRequired
  }

  /**
   * Assign a truxid to the component and connect it to the store.
   *
   */
  componentDidMount() {
    this.truxid = 'Message';
    this.props.model.connect(this);
  }

  /**
   * Make sure to disconnect the component from the store when unmounting.
   *
   */
  componentDidUnmount() {
    this.props.model.disconnect(this);
  }

  /**
   * Declare the component's storeDidUpdate method so that it can receive updates.
   *
   */
  storeDidUpdate() {
    this.forceUpdate();
  }

  render() {
    return <div>{{ this.props.model.data.message }}</div>;
  }
}

render(<Message model={message}/>, document.getElementById('app'));
```

At first, the `Message` component will render `hello world` into your app. However if we mutate the data stored in the `message` model and call the its `persist` method, the updates will be broadcast to `Message` via its `storeDidUpdate` method.

```javascript
message.data.message = 'goodbye cruel world';
message.persist();
```

This will render the `goodbye cruel world` message inside of `Message`.

#### Advanced Usage

### `Trux.Collection`

Collections are simply stores for arrays of models. A collection can only store one kind of model and you must tell it which model you plan to store within it upon instantiation.

## Extending

The `Trux.Model` and `Trux.Collection` classes are fairly barebones and are designed to be extended for your own use cases. By themselves they really just provide an architectural pattern for changing data and broadcasting these changes to your components.

The power of Trux lies in extending these classes. Let's look at an example of how to do this

```javascript
class User extends Trux.Model {
  constructor(data) {
    super(data);
  }

  get firstname() {
    return this.data.firstname;
  }

  get lastname() {
    return this.data.lastname;
  }

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
```

Now you can instantiate your `User` model and connect components to it

```javascript
const user = new User({
  firstname: 'Bilbo',
  lastname: 'Baggins'
});

console.log(user.fullname); // logs Bilbo Baggins
```

This allows to also do things like the following when you expect that models will all share some common kinds of data:

```javascript
class Model extends Trux.Model {
  constructor(data) {
    super(data);
  }

  get id() {
    return this.data.id;
  }

  get created() {
    return this.data.created_at;
  }

  get modified() {
    return this.data.modified_at;
  }
}

class User extends Model {
  //...
}

class Post extends Model {
  //...
}
```

**Note!** If you are using ES5 syntax then there is a static method provided on both `Trux.Model` and `Trux.Collection` - `extend(props, setup)` which can be used for convenience like so:

```javascript
var User = Trux.Model.extend({
  getId: function () {
    return this.data.id;
  }
}, function(User) {
  // called within User constructor after the parent has been constructed
  User.GET = `'http://example.com/api/profile/'${User.getId()}`;
});
```
