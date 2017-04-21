# Optimism vs Pessimism

Before we get into how Trux handles optimistic and pessimistic changes, let's establish what I mean by these terms.

An **optimistic change** is a state change that you apply immediately after triggering it, optimistically expecting that the change will be successful.

In contrast to this, a **pessimistic change** is a state change you apply only after you learn that the the change has succeeded.

Both types of changes have their uses and their drawbacks.

Optimistic changes are incredibly handy for enhancing the user experience of your app. Why should you make users wait if we know that the state will be identical in the end anyway?

On the other hand, there may be times where continuing in the app would be foolish without confirmation that a change has actually been successful.

There is also a catch to optimistic updates, what do we do if the change was **not** successful?

Trux provides ways to handle both situations so let's have a look at how to do this with a very simple example

```js
class User extends Model {
  constructor(data) {
    super(data);

    this.PUT = 'https://lotr.com/api';
  }

  set name(name) {
    this.data.name = name;
  }

  get name() {
    return this.data.name;
  }
}

const user = new User({ name: 'Frodo' });
const component = {
  truxid: 'Hobbit',
  storeDidUpdate: () => {
    document.getElementById('app').innerHTML = user.name;
  }
}

user.name = 'Sam';

// optimistic:

user.persist().update(user.data);

// pessimistic:

user.update().catch(console.warn);
```

In this very simple example, the optimistic change will immediately update the `innerHTML` of `#app` to `Sam` via `persist`, then send a request to `https://lotr.com/api` to update the user's name.

In this case, if the request fails, `user` will be restored to its previous state and will in turn revert `#app` back to displaying `Frodo`.

On the other hand, the pessimistic change will first attempt to send the request to `https://lotr.com/api` and only `persist` the change when the request is successful. It will also catch the error if the request fails, preventing `#app` from getting the new `innerHTML`.
