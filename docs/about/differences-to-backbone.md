# Differences to Backbone.js

> Models? Collections? Isn't this just Backbone?

When I published the first version of Trux, someone pointed out that it looked quite similar to [Backbone.js](http://backbonejs.org/). I had actually never used Backbone (Trux was actually mainly inspired by [Laravel's](https://www.laravel.com) Eloquent), so naturally I went over to check it out and did notice some similarities. I found it pretty funny that I had managed to replicate _some_ of its functionality without ever having seen it!

Yes, Trux is a multi-store solution that uses models and collections and asks you to extend these for your own use cases. Its stores are also designed to be linked to their remote equivalents (although this is not a requirement). In these senses, it is similar to Backbone, however, a core difference is that **Trux was developed from the ground up with component driven architecture in mind**.

What this means is that it has been built to service view libraries such as React and Vue. To enable this it comes packed with

* Event emission for broadcasting and tapping into changes
* Component connecting & disconnecting to ensure your UI gets updated when needed
* Smarts to restore your data to its previous state when bad things happen
* Built in ways to perform [optimistic and pessimistic updates](/usage/optimisim-vs-pessimism)
* A _best practices_ [way](/usage/connectors-nodes.md) to [structure](/usage/structure.md) your app which aligns with component driven architecture
* A modern, ES6 based, more streamlined approach. Rendering/routing is designed to be handled by a view library/framework (React, Vue etc.,)

These are what I see as the major differences between Trux and Backbone.
