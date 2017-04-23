# Collection methods

[`@see - Store methods`](/api/store/methods.md)

# `fill(models)`

```
@param {array} models - array of model data objects
@return {object} Collection
```

Fills the collection with models.
Instantiates a Model for each data item contained with in the passed array
and appends these models to the collection.

# `append(model)`

```
@param {object} model - a model, must be an instance of this.model
@return {object} Collection
```

Appends a model to the collection's models.

# `prepend(model)`

```
@param {object} model - a model, must be an instance of this.model
@return {object} Collection
```

Prepends a model to the collection's models.

# `purge()`

```
@return void
```

Purges the collection of its models.

# `persist()`

```
@return {object} Collection
```

Broadcasts changes to connected components.

# `fetch(query = '')`

```
@param {string} [query] - optional query string to append to GET endpoint
@return {object} Promise
```

Gets the collection from its remote resource.

# `static extend(props, setup)`

```
@deprecated
@param {object} props - custom props for the new class
@param {function|undefined} setup - an optional function to run within the new class' constructor
@return {function} Extension - the extended class
```

Extends Collection and returns the constructor for the new class.
_This is a convenience method for ES5, it will me removed in the future._

# `static modify(props)`

```
@deprecated
@param {object} props - the props to add to the Collection class
@return void
```

Modifies the Collection class with the passed properties.
This will enable all custom collections to inherit the properties passed to this method.
_This is a convenience method for ES5, it will me removed in the future._