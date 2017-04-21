# [Trux](https://github.com/rohan-deshpande/trux)

### `API ⇆ Trux ➝ UI`

Unidirectional data layer for reactive user interfaces.

[![Build Status](https://travis-ci.org/rohan-deshpande/trux.svg?branch=feature/es6)](https://travis-ci.org/rohan-deshpande/trux)

## Introduction

Trux is an easy-to-use, lightweight and effective way of managing mutable data for your client side JavaScript app.

With its focus placed on enabling the creation of fully customisable bridges between your data and UI, Trux provides convenient and safe ways to mutate data and synchronise these mutations with your components.

**With Trux, your data stores become the sources of truth for your app's data driven user interfaces.**

While it was designed with [React](https://rohan-deshpande.gitbooks.io/trux/content/usage/react.html) and a [REST API](https://rohan-deshpande.gitbooks.io/trux/content/usage/rest.html) in mind, Trux can also be used with other view libraries and API systems such as [Vue](https://rohan-deshpande.gitbooks.io/trux/content/usage/vue.html
) and [GraphQL](https://rohan-deshpande.gitbooks.io/trux/content/usage/graphql.html).

Want to learn more? Checkout the [quickstart](#quickstart) guide below or get an in-depth look by reading the [docs](https://rohan-deshpande.gitbooks.io/trux/content/).

## Installation

```bash
npm i -S trux
```

## Quickstart

In Trux, your client side data is kept in **stores **called **models** or **collections**. You `connect` components to these stores and ask the stores to perform data changes. Your stores can `persist` these changes to their connected components. You can choose to make these updates either **optimistic** or **pessimistic**.

Here's the basic gist, without considering requests to an API

```js
import { Model } from 'trux';

// First we're going to create a Counter model with some starting data.
// By extending the Trux Model class, we get all the functionality we need plus we can add custom methods,
// like the increment and decrement methods which mutate the state of the model.
class Counter extends Model {
  constructor() {
    super({ value: 0 });
  }

  increment() {
    this.data.value++;
    return this;
  }

  decrement() {
    this.data.value--;
    return this;
  }
}

// Instantiate the store
const store = new Counter();

// Now we are going to create a mock component to connect to our store.
// We need to declare a unique truxid and a storeDidUpdate method to receive updates from the store.
const component = {
  truxid: 'ticker',
  storeDidUpdate: () => {
    console.log(model.data.value);
  }
};

// connect the component to the store.
store.connect(component);
// call the increment and decrement methods then chain persist to see the new value get logged.
store.increment().persist(); // 1
store.increment().persist(); // 2
store.decrement().persist(); // 1
```
