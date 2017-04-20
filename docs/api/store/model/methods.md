# Model methods

# `fill`

```js
@param {object} data - the data that defines this model
@return {object} Model
```

Fills the model with data and sets the private backup for the model.

# `restore`

```js
@return {object} Model
```

Restores the model's data to its previous state.

# `persist`

```js
@param {boolean} [collection] - optionally ensure that if the model belongs to a collection, it is persisted instead. Defaults to true
@return {object} Model
```

Persits the model's data throughout its connected components. If this model belongs to a collection,
the collection's connected components are updated instead by default.