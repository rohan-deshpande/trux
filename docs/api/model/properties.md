#
Model properties

[`@see - Store properties`](/api/store/properties.md)

# `data`

```js
@prop {object|null}
```
The data which defines the model. Defaults to null.

# `collection`

```js
@prop {boolean|object}
```

The collection the model belongs to. Defaults to false.

# `wasCreated`

```js
@prop {boolean}
```

Boolean to determine if the model has been created remotely.

# `wasCreatedAt`

```js
@prop {number|undefined}
```

Timstamp to determine when the store was created, `undefined` if `wasCreated` is false.


# `wasUpdated`

```js
@prop {boolean}
```

Boolean to determine if the model has been updated locally and remotely.

# `wasUpdatedAt`

```js
@prop {number|undefined}
```

Timstamp to determine when the store was updated, `undefined` if `wasUpdated` is false.

# `wasDestroyed`

```js
@prop {boolean}
```

Boolean to determine if the model has been destroyed locally and remotely.

# `wasDestroyedAt`

```js
@prop {number|undefined}
```

Timstamp to determine when the store was destroyed, `undefined` if `wasDestroyed` is false.
