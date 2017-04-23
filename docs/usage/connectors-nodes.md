# Connectors & Nodes

I feel like the word **component** has become kind of confusing in recent times. To me **views**, **containers**, **components**, **smart components**, **dumb components** etc., are all just _**types**_ of components. Taking that into consideration, I think we need clearer, more declarative terms to describe what our components actually do.

The words `connector` and `node` are how I like to think of my Trux components. It's totally a personal choice and you can rename them to `container` and `component` or `foo` and `bar` if you like, it's totally up to you.

## Connectors

A `connector` is a UI component that is connected to a Trux `store`. If you've had a look at Redux, you might say they are similar to _containers_ or _smart components_. Typically, connectors will contain nodes and pass data to them via `props`.

A `connector` is the most appropriate candidate to use as a top level route component. Since they are connected to a store, they will be able to communicate with a remote resource via the store on demand. This isn't a requirement however, you can still have connectors within other connectors if your use case demands it. 

## Nodes

In the Trux sense, a `node` is a UI object that can receive data from a `connector` via `props`, you might know them as _dumb components_ or just _components_. They are not connected to a store. 

Typically a `connector` component would have one or many `node` components as children. A `node` **can** have local state if you wish -  a form is a good example of a component that may not need to connect to a store but would need local state to function properly. 

