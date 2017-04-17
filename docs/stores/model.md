# Model

A `Model` is a store that contains a single data object that is mutable. Mutations are broadcast to one or many connected components via the `persist` method. Through extending, your model can also contain various custom methods such as `getters`, `setters` and pretty much anything you like.

Trux models extend the base `Store` class and therefore inherit a number of methods and properties which make synchronising them with your UI very easy. Let's take a quick look at how to do that.

In this very simple example we're going to attach a React component to an out of the box Trux model.

```js
import { Model } from 'trux';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';

// instantiate a model with some data. This data will be assigned to the message.data property.
const message = new Model({ 'message': 'hello world' });

class Message extends Component {

  /**
   * Pass the model in via props.
   *
   */
  static propTypes = {
    model: PropTypes.object.isRequired
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
    return <div>{this.props.model.data.message}</div>;
  }
}

// render the Message component into a div with an id of 'app'
render(<Message model={message}/>, document.getElementById('app'));
```

At first, the `Message` component will render `hello world` into your app. However if we mutate the data stored in the `message` model and call the its `persist` method, the updates will be broadcast to `Message` via its `storeDidUpdate` method.

```js
message.data.message = 'goodbye cruel world';
message.persist();
```

This will render the `goodbye cruel world` message inside of `Message`. 

**Note!** You should avoid mutating store data directly where possible, this is done here for the sake of brevity for this example. See 

