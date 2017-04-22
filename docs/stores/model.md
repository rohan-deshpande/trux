# Model

A `Model` is a store that contains a single data object that is mutable. Mutations are broadcast to one or many connected components via the `persist` or `update` method. Through extending, your model can also contain various custom methods such as `getters`, `setters` and pretty much anything you like.

Trux models extend the base `Store` class and therefore inherit a number of methods and properties which make synchronising them with your UI very easy.

In this very simple example using ES5 syntax and plain JavaScript, we'll take a simple look at how models and connected components interact with one another

```js
var app = document.createElement('div');
// instantiate a model
var character = new trux.Model({ name: 'Frodo' });
// create a 'component'
var hobbit = {
  truxid: 'Hobbit',
  storeDidUpdate: function () {
      document.getElementById('app').innerHTML = character.data.name;
  }
}
var hobbits = [
  'Frodo',
  'Sam',
  'Pippin',
  'Merry'
];

app.id = 'app';
document.body.appendChild(app);
// connect the component to the store
character.connect(hobbit);

setInterval(function() {
  // mutate the store's data
  character.data.name = hobbits[Math.floor(Math.random() * hobbits.length)];
  // persist the mutation
  character.persist();
}, 1000);
```

In this example, the `innerHTML` of the `#app` element will be updated to a random item of the `hobbits` array every second. You can see a working version of this example here.

**Note!** You should avoid mutating store data directly where possible, this is done here for the sake of brevity for this example. See [internal store changes](/about/differences-to-redux.md#internal-store-changes) for more info.

## Learn more

* Model properties
* Model methods
