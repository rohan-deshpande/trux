# Model methods

# `fill(data)`

```js
@param {object} data - the data that defines this model
@return {object} Model
```

Fills the model with data and sets the private backup for the model.

# `restore()`

```js
@return {object} Model
```

Restores the model's data to its previous state.

# `persist(collection = true)`

```js
@param {boolean} [collection] - optionally ensure that if the model belongs to a collection, it is persisted instead. Defaults to true
@return {object} Model
```

Persits the model's data throughout its connected components. If this model belongs to a collection,
the collection's connected components are updated instead by default.

# `fetch()`

```js
@return {Object} Promise
```

Fetches the remote data for the model, then fills the model with the JSON response.

# `create(data)`

```js
@param {object} data - the data for the new model
@return {object} Promise
```
Creates a new model in the remote data store. Sets the `wasCreated` boolean and `wasCreatedAt` timestamp properties on the model.
