# Differences to Backbone.js

> Models? Collections? Isn't this just Backbone?

When I published the first version of Trux, someone pointed out that it looked similar to [Backbone.js](http://backbonejs.org/). I had actually never used Backbone (Trux was mainly inspired by [Laravel's](https://www.laravel.com) Eloquent), so naturally I went over to check it out and noticed some similarities, but also some key differences.

Yes, Trux is a multi-store solution ([sort of](/usage/stores-module)) that uses models and collections and asks you to extend these for your own use cases. Its stores are also designed to be linked to their remote equivalents (although this is not a requirement). In regards to these aspects, it is similar to Backbone, however, a core difference is that **Trux was developed from the ground up with component driven architecture in mind**.

What this means is that it has been built as a data layer to service modern view libraries. To enable this it comes packed with

* Component connecting & disconnecting to ensure your UI gets updated when needed
* Smarts to restore your data to its previous state when bad things happen
* Built in ways to perform [optimistic and pessimistic updates](/usage/optimisim-vs-pessimism)
* [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) based requests using `promises` rather than AJAX
* A _suggested_ [way](/usage/connectors-nodes.md) to [structure](/usage/structure.md) your app which aligns with component driven architecture
* A modern, ES6 based, more streamlined approach that defers to your view library (React, Vue etc.,) for rendering and routing solutions

These are what I see as the major differences between Trux and Backbone. There may be others but I think ultimately the focus on a more modern and component driven approach is what sets them apart. Checkout the [examples](/about/examples.md) to get a better understanding of how Trux works. 
