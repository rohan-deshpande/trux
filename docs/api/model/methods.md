# Model methods

[`@see - Store methods`](/api/store/methods.md)

# `fill(data)`

```
@param {object} data - the data that defines this model
@return {object} Model
```

Fills the model with data and sets the private backup for the model.

# `restore()`

```
@return {object} Model
```

Restores the model's data to its previous state.

# `persist(collection = true)`

```
@param {boolean} [collection] - optionally ensure that if the model belongs to a collection, it is persisted instead. Defaults to true.
@return {object} Model
```

Persits the model's data throughout its connected components. If this model belongs to a collection,
the collection's connected components are updated instead by default.

# `fetch(query = '')`

```
@param {string} [query] - optional query string to append to GET endpoint
@return {Object} Promise
```

Fetches the remote data for the model, then fills the model with the JSON response.

# `create(data)`

```
@param {object} data - the data for the new model
@return {object} Promise
```
Creates a new model in the remote data store.

# `update(options)`

```
@param {object} [options] - configuration options
@param {object} [options.data] - the data to update the model with, defaults to the current model data
@param {string} [options.method] - the method to use, should be either PUT or PATCH, defaults to PUT
@param {boolean} [options.optimistic] - boolean to determine if this update was already persisted optimistically
@param {boolean} [options.collection] - collection argument for the persist method
@return {object} Promise
```

Updates the model in the remote data store and fills the model with the response payload.

# `destroy()`

```
@return {object} Promise
```

Sends a request to delete from the remote data store, then purges and disconnects all components from the model.

# `purge()`

```
@return {object} Model
```

Purges the model of its data.

# `static extend(props, setup)`

```
@deprecated
@param {object} props - custom props for the new class
@param {function|undefined} setup - an optional function to run within the new class' constructor
@return {function} Extension - the extended class
```
Extends Model and returns the constructor for the new class. _This is a convenience method for ES5, it will me removed in the future._

# `static modify(props)`

```
@deprecated
@param {object} props - the props to add to the Trux.Model class
@return void
```

Modifies the Model class with the passed properties.
This will enable all custom models to inherit the properties passed to this method. _This is a convenience method for ES5, it will me removed in the future._
