# Vue

Even though Trux was developed with React in mind, getting it working with [Vue](https://vuejs.org/) is just as simple. Like with React, you'll need to add a few things to your components to wire it up, let's take a look.

## Connecting

Connecting a Vue component to a Trux store must occur in the `mounted` lifecycle method. Within this method there are two things you'll have to do.

### Setting a `truxid` for your component

You must set a`truxid`for your component. This must be a **unique** identifier and will be how the component will be found for disconnection later.

```js
mounted() {
  this.truxid = 'MyComponent'
}
```

### Connecting your component to a store

```js
mounted() {
  this.truxid = 'MyComponent' // set the truxid first
  this.store.connect(this); // connect this component to the store which should be passed in via props
}
```

You must do this **after** setting the `truxid` or Trux will throw a `ReferenceError`.

### Setting your component's `storeDidUpdate` method

Each component which you connect to a store needs a `storeDidUpdate` method in order to receive broadcasted updates. In Vue, you can simply set this as one of your component's methods

```js
methods: {
  data: {
    name: 'Frodo'
  },
  storeDidUpdate: () => {
    this.name = this.store.name;
  }
}
```

Now your component will receive updates from the store when required. It's up to you to choose how you wish to handle these changes inside your `storeDidUpdate` method.

## Disconnecting

If a component is going to be unmounted from the DOM, you must disconnect it from any stores it is connected to within the `destroyed` lifecycle method. If you do not, then if you update the store at a later time, Vue will throw errors because the connected component will no longer exist.

Since you set a `truxid` for your component when it mounted, disconnecting is as simple as just calling a single method from the store

```js
destroyed() {
    this.store.disconnect(this);
}
```
