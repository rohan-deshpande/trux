# Trux
## A micro data framework for ReactJS

Trux is a simple, lightweight and effective way of managing mutable data for your client side React app.

Trux allows you to create client side data store objects which contain bindings to React components. These objects do not manage the state of your components, they simply act as interfaces between your data and the client side of your app. Data store changes can be triggered anywhere in your app, these changes will then be broadcast to all of the store's bound components.

**In Trux, your data stores are the single source of truth for your app's data dependent React components.**

Trux comes packed with a parent object `Trux`, a `Trux.Base` class and two data store classes, `Trux.Model` and `Trux.Collection` which are designed to be branched for your own use cases.

Trux focuses on inheritance and provides a `Trux.branch` method to branch `Trux.Model` or `Trux.Collection` into new classes with custom methods. 

Checkout the short guide below, the examples and the docs to get an idea of how to use Trux.

> Trux was developed for my project management & analytics application, **Trakktion** and was inspired by [Flux](https://facebook.github.io/flux/) concepts. After developing Trux, I felt it was working quite nicely for me and thought others might find it useful, so I decided to turn it into its own thing.

## Files
The following files are included in the `dist` directory of the package

* `trux.js` 100% pure Trux, no dependencies included and unminified
* `trux.min.js` Same as the above but minified
* `trux.bundle.js` A stable compiled build of Trux which includes its dependencies
* `trux.bundle.min.js` Same as the above but minified

## Basic Usage

Include `trux.js` or `trux.min.js` before your closing `<body>` tag:

```html
<script type="text/javascript" src="/js/trux.bundle.min.js"></script>
```

In your app, construct a new `Trux.Model`, pass it some data and bind a component to it, remembering to set the component's `appDataDidChange` method.

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
```

Mutate the data inside of `MyModel` then call it's `emitChangeEvent()` method.

```javascript
MyModel.data.message = 'goodbye cruel world';
MyModel.emitChangeEvent();
```

You will see the change reflected in `MyComponent`


## Branching

The power of Trux lies in its use of [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript) which means that you can branch `Trux.Model` or `Trux.Collection` to create custom models or collections that have custom methods while still maintaining access to the methods and properties of the base classes. Of course you can then branch your own custom classes into new ones as well.

Let's look at a simple way to do this.

```javascript
/**
 * Declare a custom Trux.Model class. Custom classes should be stored inside the Trux.models or Trux.collections objects for easy reference.
 *
 */
Trux.models.User = function (data) {
	Trux.Model.call(this);
};

/**
 * Custom User model method.
 *
 */
Trux.models.User.prototype.getFullName = function () {
	return this.data.firstName + ' ' + this.data.lastName;
}

/**
 * Branch Trux.Model into Trux.models.User.
 *
 */
Trux.branch(Trux.Model, Trux.models.User);

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

From this short example you can see how we can easily branch Trux classes into new classes with custom methods for whatever purpose we like.


## Working with remote data

Trux was designed to work with a RESTful API. It assumes that your app has one or is working with an existing API, like [Parse](https://parse.com) or [Firebase](https://firebase.com). 

The provided methods within both `Trux.Model` and `Trux.Collection` do make some assumptions as to how data is being sent back from your API. If this doesn't gel with your setup, you can simply branch new versions of these and write your own REST methods.

For more info on how this is achieved, please check the `remote.html` example which uses Parse and read the docs.
