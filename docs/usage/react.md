# React

Trux was designed with [React](https://facebook.github.io/react/) in mind, so working it into your app should be very straight forward. There are a few things you will need to do in your components to get it working as intended however, let's take a look at those now.

## Connecting

Connecting a React component to a Trux must occur within the `componentDidMount` lifecycle method. Within this method there are two things you are required to do, and some optional things you may need to perform.

### Setting a `truxid` for your component

You must set a `truxid` for your component. This must be a **unique** identifier and will be how the component will be found for disconnection later.

```js
componentDidMount() {
  this.truxid = 'MyComponent';
}
```

### Connecting your component to a store

Likewise you also need to `connect` the component to the store to ensure it receives updates

```js
componentDidMount() {
  this.truxid = 'MyComponent'; // set the truxid first
  this.props.store.connect(this); // connect the component to the store
}
```

You must do this **after** setting the `truxid` or Trux will throw a `ReferenceError`.

### Setting your component's `storeDidUpdate` method

Each component which you connect to a store needs a `storeDidUpdate` method in order to receive broadcasted updates. In React, you can simply set this as one of your component's methods

```js
storeDidUpdate() {
  this.forceUpdate();
}
```

Now your component will receive updates from the store when required. It's up to you to choose how you wish to handle these changes inside your `storeDidUpdate` method.

## Disconnecting

If a component is going to be unmounted from the DOM, you must disconnect it from any stores it is connected to within the `componentWillUnmount` lifecycle method. If you do not, then if you update the store at a later time, React will throw errors because the connected component will no longer exist.

Since you set a `truxid` for your component when it mounted, disconnecting is as simple as just calling a single method from the store

```js
componentWillUnmount() {
    this.props.store.disconnect(this);
}
```

## Example

Here's an example of how this might work in a real life situation:

```js
import { User } from './stores/models';
import React, { Component, PropTypes } from 'react';

// Profile is, as we term it in Trux, a connector.
// It will contain three nodes, ProfilePic, UserName and UserBio
class Profile extends Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { ready: false }
  }

  componentDidMount() {
    this.truxid = 'Profile';
    this.props.userStore.connect(this);
    this.props.userStore.fetch()
      .then(() => {
          this.setState({ ready: true });
      })
      .catch(console.log);
  }

  componentWillUnmount() {
    this.props.userStore.disconnect(this);
  }

  render() {
    if (!this.props.ready) return null;

    const user = this.props.userStore;

    return (
      <div className='profile'>
        <ProfilePic image={user.pic} />
        <UserName username={user.username} />
        <UserBio bio={user.bio} />
      </div>
    );
  }
}
```
