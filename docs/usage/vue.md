# Vue

Even though Trux was developed with React in mind, getting it working with Vue is just as simple. Like with React, you'll need to add a few things to your components to wire it up, let's take a look.

## Connecting

Connecting a Vue component to a Trux store must occur in the `mounted` lifecycle method. Within this method there are two things you'll have to do.

### Setting a `truxid` for your component

You must set a`truxid`for your component. This must be a **unique **identifier and will be how the component will be found for disconnection later.

```js
mounted() {
    this.truxid = 'MyComponent'
}
```

### Connecting your component to a store

```js
mounted() {
    this.truxid = 'MyComponent' // set the truxid first
    this.store.connect(this); // connect this component to the store
}
```





