# Optimism vs Pessimism

Before we get into how Trux handles optimistic and pessimistic changes, let's establish what I mean by these terms.

An **optimistic change** is a state change that you apply immediately after triggering it, optimistically expecting that the change will be successful.

In contrast to this, a **pessimistic change** is a state change you apply only after you learn that the the change has succeeded.

Both types of changes have their uses and drawbacks.

Optimistic changes are incredibly handy for enhancing the user experience of your app. Why should we make users wait when we know that the state will be identical in the end anyway?

On the other hand, there may be times where continuing in the app would be foolish without confirmation that a change has actually been successful.

There is also a catch to optimistic updates, what do we do if the change was **not** successful?

Trux provides ways to handle both situations so let's have a look at how to do this with a very simple example

```js
class Character extends Model {
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

const character = new Character({ name: 'Frodo' });
const hobbit = {
  truxid: 'Hobbit',
  storeDidUpdate: () => {
    document.getElementById('app').innerHTML = character.name;
  }
}

character.connect(hobbit);

// optimistic:

character.name = 'Sam';
character
  .update({ optimistic: true })
  .catch(console.warn);

// pessimistic:

character.name = 'Pippin';
character
  .update()
  .catch(console.warn);
```

In this very simple example, the optimistic change will immediately update the `innerHTML` of `#app` to `Sam`, then send a request to the API to update the character's name remotely.

In this case, if the request fails, `character` will be restored to its previous state and will in turn revert `#app` back to displaying `Frodo`.

On the other hand, the pessimistic change will first attempt to send the request to the API and only broadcast the change when the request is successful.

Since `update` always returns a `Promise` you are free to chain `then` or `catch` methods off it to do custom success or error handling when needed.

