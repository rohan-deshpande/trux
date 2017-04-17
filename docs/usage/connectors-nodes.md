# Connectors & Nodes

## No components?

I feel like the word **component** has become kind of confusing in recent times. Words mean things, and to me **views**, **containers**, **components**, **smart components**, **dumb components** etc., are ALL just _**types**_ of components. Taking that into consideration, I think we need clearer terms to describe what our components actually are doing.

The words `connector` and `node` are how I like to think of my Trux components. It's totally a personal choice and you can rename them to `container` and `component` or `foo` and `bar` if you like, it's totally up to you.

## Connectors

A `connector` is a UI component that is connected to a Trux `store`. If you've had a look at Redux, you might say they are similar to _containers_ or _smart components_. Typically, connectors will contain nodes and pass data to them via `props`.

A `connector` is the most appropriate candidate to use as a top level route component. Since they are connected to a store, they will have the `fetch` method allowing them to retrieve data from the remote resource on demand.

## Nodes

In the Trux sense, a `node` is a UI object that can receive data from a `connector` via `props`, you might know them as _dumb components_ or just _components_.

Typically a `connector` component would have one or many `node` components as children.

