# [Trux](https://github.com/rohan-deshpande/trux)

`API ⇆ Trux ➝ Components`

A simple data framework for React.js

## Contents

* [What's New](#whats-new)
* [Introduction](#introduction)
* [Why Trux?](#why-trux)
* [Installation](#installation)
* [Files](#files)
* [Basic Usage](#basic-usage)
* [Extending](#extending)
* [Working with remote data](#working-with-remote-data)
* [Documentation](http://rohandeshpande.com/trux)
* [License (MIT)](#license)

## What's New

`v2.1.0` brings the `modify` method to both `Trux.Model` and `Trux.Collection` allowing you to easily modify these base objects for your own needs. This would allow you do do something like

```javascript
Trux.Model.modify({

	/**
     * Gets the id of the model.
     *
     * @return {String|Integer} id - the id of the model
     */
	getId: function () {
		return this.id;
	}
});
```

This is different to the `extend` method as it means that **every** model or collection you create after this will inherit the properties passed to the `modify` method.

## Introduction

Trux is an easy, lightweight and effective way of managing mutable data for your client side React.js app.

It allows you to create client side data store objects which contain bindings to React components. These objects do not manage the state of your components, they simply act as interfaces between your data and the client side of your app. Data store changes can be triggered anywhere in your app, these changes will then be broadcast to all of the store's bound components.

**In Trux, your data stores are the sources of truth for your app's data dependent React components.**

Trux comes packed with a parent object `Trux`, a `Trux.Base` class and two data store classes, `Trux.Model` and `Trux.Collection` which are designed to be extended for your own use cases.

Trux focuses on inheritance and provides a way to extend `Trux.Model` or `Trux.Collection` into sub classes with custom methods & properties.

Checkout the short guide below, the examples and the [docs](http://rohandeshpande.com/trux) to get an idea of how to use Trux.

> Trux was developed for my project management & analytics application, **Tr**akktion and was inspired by [Fl**ux**](https://facebook.github.io/flux/) concepts. After hashing out the main concepts and developing a working prototype, I felt it was working quite nicely for me and thought others might find it useful, so I decided to turn it into its own thing.

## Why Trux?

Trux is super easy to drop into your React app and get your back and front talking to one another in a Flux-like fashion, especially if you have an existing API.

Your app doesn't need to be structured in a specific way, all you need to do is install Trux and then define some models/collections to pass to your components. When you set your RESTful routes up for your data stores, Trux will handle the requesting/broadcasting for you.

If you've already got an app going using Flux or Redux and you're happy with how it works, Trux may not be for you, but if you're looking for a simple way to get unidirectional data flows persisting throughout your app, Trux might be just what you need.

## Installation

```
npm install truxjs
bower install trux
```

Or simply download the repo and...

```html
<script type="text/javascript" src="/path/to/trux.bundle.min.js"></script>
```


## Files

The following files are included in the `dist` directory of the package

* `trux.js` 100% pure Trux, no dependencies included and unminified
* `trux.min.js` Same as the above but minified
* `trux.bundle.js` A stable compiled build of Trux which includes its dependencies
* `trux.bundle.min.js` Same as the above but minified

## Basic Usage

After including Trux in your app, construct a new `Trux.Model`, pass it some data and bind a component to it, remembering to set the component's `appDataDidChange` method. Then, render the component into the DOM.

```javascript
/**
 * Construct a new Trux.Model and give it some data containing a message property.
 *
 */
var MyModel = new Trux.Model({'message':'hello world'});

/**
 * Create a React component which will have MyModel passed to it via props.
 *
 */
var MyComponent = React.createClass({

	propTypes: {
		model:React.PropTypes.object.isRequired
	}

    getInitialState:function () {
        return {
            model:this.props.model
        };
    },

    /**
     * Set the component's unique truxId and bind the component to the model.
     *
     */
    componentDidMount:function () {
        this.truxId = 'MyComponent'
        this.state.model.bindComponent(this);
    },

    /**
     * The method called by Trux's private broadcast method which persists changes in data across bound components.
     *
     */
    appDataDidChange:function () {
        this.forceUpdate();
    },

    /**
     * Render the component and display the model's message.
     *
     */
    render:function() {
        return <div>{this.state.model.data.message}</div>;
    }
});

/**
 * Render the component into the DOM
 *
 */
ReactDOM.Render(
	<MyComponent model={MyModel} />,
	document.getElementById('app')
);
```

Now, when you call `MyModel.update()` after mutating `data.message` the change will be reflected in `MyComponent`.


## Extending

The power of Trux lies in its use of [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript) which means that you can extend `Trux.Model` or `Trux.Collection` to create extended classes that have custom methods while still maintaining access to the methods and properties of their parent classes.

Let's look at a simple way to do this.

```javascript
/**
 * Create a Trux.Model extension.
 * Custom classes should be stored inside the Trux.models or Trux.collections objects for easy reference.
 * Give the User model some custom methods.
 *
 */
Trux.models.User = Trux.Model.extend({
    getFullName: function () {
        return this.data.firstName + ' ' + this.data.lastName;
    }
});

/**
 * Declare a new User model and give it some data.
 *
 */
var Bilbo = new Trux.models.User({
	firstName: 'Bilbo',
	lastName: 'Baggins'
});

/**
 * Call the custom function to get Biblo's full name!
 *
 */
console.log(Bilbo.getFullName()); // logs Bilbo Baggins

```

From this short example you can see how we can easily extend Trux classes creating new classes with custom methods for whatever purpose we like.


## Working with remote data

Trux was designed to work with a RESTful API. It assumes that your app has one or is working with an existing API, like [Parse](https://parse.com) or [Firebase](https://firebase.com).

The provided methods within both `Trux.Model` and `Trux.Collection` do make some assumptions as to how data is being sent back from your API. If this doesn't gel with your setup, you can simply extend these classes and write your own REST methods or alternatively override the base methods yourself.

For more info on how this is achieved, please check the `remote.html` example which uses Parse and read the docs.

## License

Copyright (c) 2016 Rohan Deshpande and other contributors

Licensed under the MIT License
