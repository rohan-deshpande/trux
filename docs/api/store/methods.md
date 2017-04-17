# Store methods

## `connect(component)`

```js
@param {object} component - the component to connect to this store
@throws ReferenceError - if component.truxid is undefined
@return void
```

Connects a component to the store and ensures the component receives updates via broadcast. Throws a `ReferenceError` if the component does not have a `truxid` defined and triggers a console warning if the component does not have a `storeDidUpdate` method.

**Note!** For React, this should be called within the component's `componentDidMount` method.

## `disconnect(component)`

```js
@param {object} component - the component to disconnect from this store
@throws ReferenceError - if component.truxid is undefined
@return void
```

Disconnects a component from the store, stopping it from receiving updates.

**Note!** For React, this should be called within the component's `componentWillUnmount` method.

## `close()`

```js
@return {object} Store
```

Disconnects all components from the store.

## `addRequestHeader(key, value)`

```js
@param {string} key - the key for the header
@param {mixed} value - the value for the header
@return {object} Store
```

Adds a request header.

## `deleteRequestHeader(key)`

```js
@param {string} key - the key for the header to delete
@return {object} Store
```

Deletes a request header.

## `set requestHeaders(headers)`

```js
@param {object} headers - headers object
@return void
```

Set the store's request headers.

## `get requestHeaders()`

```js
@return {object}
```

Gets the store's request headers.

## `set wasFetched(wasFetched)`

```js
@param {boolean} wasFetched
@return void
```

Sets the `wasFetched` boolean and `wasFetchedAt` timestamp properties.

## `get wasFetched()`

```js
@return {boolean}
```

Gets the `wasFetched` property.

## `get wasFetchedAt()`

```js
@return {number}
```

Gets the `wasFetchedAt` property.

