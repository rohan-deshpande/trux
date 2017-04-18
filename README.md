# [Trux](https://github.com/rohan-deshpande/trux)

### `API ⇆ Trux ➝ UI`

Unidirectional data layer for reactive user interfaces.

[![Build Status](https://travis-ci.org/rohan-deshpande/trux.svg?branch=feature/es6)](https://travis-ci.org/rohan-deshpande/trux)

## Introduction

Trux is an easy-to-use, lightweight and effective way of managing mutable data for your client side JavaScript app.

With its focus placed on enabling the creation of fully customisable and effective bridges between your data and UI, Trux provides convenient and safe ways to mutate data and synchronise these changes with your components.

**With Trux, your data stores become the sources of truth for your app's data dependent user interfaces.** All you need to do is create some stores, connect components to them and let it do the work.

While it was designed with [React](https://rohan-deshpande.gitbooks.io/trux/content/usage/react.html) and a REST API in mind, Trux can also be used with other view libraries and API systems such as [Vue](https://rohan-deshpande.gitbooks.io/trux/content/usage/vue.html
) and [GraphQL](https://rohan-deshpande.gitbooks.io/trux/content/usage/graphql.html).

Want to learn more? Checkout the [quickstart](#quickstart) guide below or read the [docs](https://rohan-deshpande.gitbooks.io/trux/content/).

## Installation

```bash
npm i -S trux
```

## Quickstart

In Trux, your client side data is kept in stores, either **models** or **collections**, which communicate with your remote resources. You connect components to these stores and ask the stores to perform data changes. Your stores will update both your client side and remote data, persisting the changes to their connected components. You can choose to make these updates either **optimistic** or **pessimistic**.

```js
import { Model } from 'trux';

class Counter extends Model {
    constructor() {
        super({ value: 0 });
    }
    
    increment() {
        this.data.value++;   
    }
    
    decrement() {
        this.data.value--;
    }
}

const counter = new Counter();

const ticker = {
    truxid: 'component',
    storeDidUpdate: () => {
        console.log(counter.data.value);
    }
};

counter.connect(ticker);
counter.increment(); // logs 1;
counter.increment(); // logs 2;
counter.decrement(); // logs 1;
```



