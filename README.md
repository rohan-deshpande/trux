# Trux
## A micro data framework for ReactJS

Trux is a simple, lightweight and effective way of managing mutable data for your client side React app.

Trux allows you to create client side data store objects which contain bindings to React components. These objects do not manage the state of your components, they simply act as data interfaces between your data and the client side of your app. Data store changes can be triggered anywhere in your app, these changes will then be broadcast to all of the store's bound components.

**In Trux, your data stores are the single source of truth for your app's data dependent React components.**

Trux comes packed with a parent object `Trux`, a `Trux.Base` class and two data store classes, `Trux.Model` and `Trux.Collection` which are designed to be branched for your own use cases.

Trux focuses on inheritance and provides a `Trux.branch` method to branch `Trux.Model` or `Trux.Collection` into new classes with custom methods .

Checkout the short guide below, the examples and the docs to get an idea of how to use Trux.

> Trux was developed for my project management & analytics application, **Trakktion** and was inspired by [Flux](https://facebook.github.io/flux/) concepts. After developing Trux, I felt it was working quite nicely for me and thought others might find it useful, so I decided to turn it into its own thing.

## Basic Usage

Include `trux.js` or `trux.min.js` before your closing `<body>` tag;

```html
<script type="text/javascript" src="/js/trux.js"></script>
```

In your app, construct a new `Trux.Model`, pass it some data and bind a component to it, remembering to set the component's `appDataDidChange` method.

```javascript
var MyModel = new Trux.Model({'message':'hello world'});
var MyComponent = React.createClass({

	propTypes: {
		model:React.PropTypes.object.isRequired
	}

    getInitialState:function () {
        return {
            model:this.props.model
        };
    },

    componentDidMount:function () {
        this.truxId = 'MyComponent'
        myModel.bindComponent(this);
    },

    appDataDidChange:function () {
        this.forceUpdate();
    },

    render:function() {
        return <div>{this.state.model.data.message}</div>;
    }
});
```

Mutate the data inside of `MyModel` then call it's `emitChangeEvent()` method.

```
MyModel.data.message = 'goodbye cruel world';
MyModel.emitChangeEvent();
```

You will see the change reflected in `MyComponent`


## Branching

The power of Trux lies in its use of [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript) which means that you can branch `Trux.Model` or `Trux.Collection` to create custom models or collections that have custom methods while still maintaining access to the methods and properties of the base classes. Of course you can then branch your own custom classes into new ones as well. 

Let's look at a simple way to do this. 

```javascript
Trux.models.User = function (data) {
	Trux.Model.call(this);
};

User.prototype.getFullName = function () {
	return this.data.firstName + ' ' + this.data.lastName; 
}

Trux.branch(Trux.Model, Trux.models.User);

var Bilbo = new Trux.models.User({
	firstName: 'Bilbo',
	lastName: 'Baggins'
});

console.log(Bilbo.getFullName()); // logs Bilbo Baggins
```

From this short example you can see how we can easily branch Trux classes into new classes with custom methods for whatever purpose we like.


## Working with remote data

Trux was designed to work with a RESTful API. It assumes that your app has one or is working with an existing API, like [Parse](https://parse.com) or [Firebase](https://firebase.com). For more info on how this is achieved, please check the `remote.html` example which uses Parse, and check the docs. 
