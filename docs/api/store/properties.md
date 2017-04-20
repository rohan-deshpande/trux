# Store properties

# `components`

Each store has a `components` object which contains the store's connected components which are keyed by `truxid`. When connecting a component to a store, it is required that the component you pass to the `connect` method has a `truxid` property set. This property is used to broadcast changes to the component and also to remove it from the store's `components` object when `disconnect` is called.

## `emitter`

The `emitter` for a store is used to emit and listen for `change` events. When a `change` event is fired, a store will update its connected components via their `storeDidUpdate` method. You should not need to interact with the `emitter` directly, as these interactions are abstracted away by a store's `persist` method.

## `requestHeaders`

These are the `Headers` sent with every API request if your stores communicate with a remote resource or entity graph. The single default header is `Content-Type: 'application/json'`. Headers can added, deleted or set via the `addRequestHeader`, `deleteRequestHeader` or `setRequestHeaders` methods.

## `GET`

This is the `GET` route for the store and is applicable to both models and collections. This is the route used by the `fetch` method of either store. You can set the `GET` property manually or in the constructor of a store extension.

## `POST`

This is the `POST` route for the store and is applicable to both models and collections. This is the route used by the `create` method of either store. You can set the `POST` property manually or in the constructor of a store extension.

## `PUT`

This is the `PUT` route for the store and is applicable to only models. This is the default route used by the `update` method of a model. You can set the `PUT` property manually or in the constructor of a store extension.

## `PATCH`

This is the `PATCH` route for the store and is applicable to only models. This is the optional route used by the `update` method of a model. You can set the `PATCH` property manually or in the constructor of a store extension.

## `DELETE`

This is the `DELETE` route for the store and is applicable to only models. This is the route used by the `destroy` method of a model. You can set the `DELETE` property manually or in the constructor of a store extension.

## `wasFetched`

```js
@prop {boolean|undefined}
```

## `wasFetchedAt`

```js
@prop {number|undefined}
```

