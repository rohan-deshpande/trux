# Trux
## A micro data framework for ReactJS

Trux is a simple, lightweight and effective way of managing data for your client side React app.

Trux allows you to create client side data store objects which contain bindings to React components. These objects do not manage the state of your components, they simply act as data interfaces between your remote data and the client side of your app. Data store changes can be triggered anywhere in your app, these changes will then be broadcast to all of the store's bound components.

In Trux, your Trux data stores are the single source of truth for your app's data dependent React components.

Trux comes packed with a parent object `Trux` and two data store objects, `TruxModel` and `TruxCollection` which are designed to be extended for your own use cases.

Trux focuses on inheritance, which means any `new TruxModel` or `new TruxCollection` you instantiate will have access to the base methods of those objects, but will also be extendible with custom methods.

Checkout the examples and documentation to get an idea of how to use Trux.

> Trux was developed for my project management & analytics application, **Trakktion** and was inspired by [Flux](https://facebook.github.io/flux/) concepts. After developing Trux, I felt it was working quite nicely for me and thought others might find it useful, so I decided to turn it into its own thing.

## Usage

Include `trux.js` before your closing `<body>` tag;

```html
<script type="text/javascript" src="/js/trux.js"></script>
```

In your app, declare a new `TruxModel` and bind a component to it, remembering to set the component's `appDataDidChange` method.

```javascript
var MyModel = new TruxModel('myModel').setData({'message':'hello world'});
var MyComponent = React.createClass({

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
        return <div>{this.state.model.data.message}</div>
    }
});
```

You're now set up to interact with `MyModel` and have its changes reflected in the `MyComponent`.


# Documentation

## Getting Started

Kicking off with Trux is super simple. The following code illustrates a very basic example of how to use Trux.

First, let's define a `TruxModel`, set its data then define a React component. We will then render the component to the DOM. After that, just to show how things work in the simplest way possible, we'll set up a `setInterval` to change the Model's data every two seconds, while also emitting the model's change event.

```javascript
/**
 * Set our variables.
 *
 */
var myData = {'thing':"Keep on truxin'"};
var myModel = new TruxModel('myModel').setData(myData);
var MyComponent = React.createClass({

    /**
     * Pass in the model via the component props.
     *
     */
    propTypes: {
        model:React.PropTypes.object
    },

    /**
     * Set a reference to the model in the component's state.
     *
     */
    getInitialState: function () {
        return {
            model:this.props.model
        };
    },

    /**
     * When the component mounts, set a truxId property on the component.
     * Bind the component to the model.
     *
     */
    componentDidMount: function () {
        this.truxId = 'MyComponent';
        this.state.model.bindComponent(this);
    },

    /**
     * Remember to unbind the component when the component unmounts.
     *
     */
    componentWillUnmount: function () {
        this.state.model.unbindComponent(this);
    },

    /**
     * The method called by Trux's broadcast method
     *
     */
    appDataDidChange: function () {
        this.forceUpdate();
    },

    render: function () {
        return (
            <div>{this.state.model.data.thing}</div>
        );
    }
});

/**
 * Render the component to the DOM
 *
 */
ReactDOM.render(<MyComponent model={myModel} />, document.getElementById('app'));

/**
 * Set an interval to change myModel's data every 2 seconds and emit the TruxModel's change event.
 * This causes MyComponent to re render via its appDataDidChange method.
 *
 */
setInterval(function() {
    var things = [
        "Don't trux on me",
        "Keep on truxin'",
        "See you later, trux cowboy",
        "Samurai Truxploo",
    ];
    myModel.data.thing = things[Math.floor(Math.random() * things.length)];
    myModel.emitChangeEvent();
}, 2000);

```

After the `setInterval` runs, `MyComponent` will re render and the new value for `thing` will be displayed.

## Extending the Trux base objects

Trux's real strength lies in its focus on inheritance. You can easily declare new, custom TruxModels which have their own methods while still accessing their parent's methods. Check out the following example for how this works.
