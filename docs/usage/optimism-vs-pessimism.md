# Optimism vs Pessimism

Before we get into how Trux handles optimistic and pessimistic changes, let me just explain what I mean by these terms. 

An optimistic change is a state change that you apply immediately after triggering it, optimistically expecting that the change will be successful. 

In contrast to this, a pessimistic change is a state change you apply only after you learn that the the change has succeeded. 

Both types of changes have their uses. 

Optimistic changes are incredibly useful for enhancing the user experience of your app. Why should you make users wait if we know that the data will be identical in the end anyway?

On the other hand, there may be times where continuing in the app would be foolish without confirmation that a change has actually been successful.

There is also a catch to optimistic updates, what do we do if the change was **not** successful? 

Trux provides ways to handle both situations so let's have a look at how to do this with some short examples. 

```js
const user = new Model({ name: 'Frodo' });


```




