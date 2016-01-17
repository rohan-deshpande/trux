# Trux
## A micro data framework for ReactJS

Trux is a simple, lightweight and effective way of managing data for your client side React app.

Trux allows you to create client side data store objects which contain bindings to React components. These objects do not manage the state of your components, they simply act as data interfaces between your remote API and the client side of your app. Data store changes can be triggered anywhere in your app and these changes will be broadcast to all of the store's bound components.

Trux comes packed with a parent object `Trux` and two data store objects, `TruxModel` and `TruxCollection` which are designed to be extended for your own use cases.

Trux is all about inheritance, which means any `new TruxModel` or `new TruxCollection` you instantiate will have access to the base methods of those objects, but will also be extendible with custom methods.

Checkout the examples and documentation to get an idea of how to use Trux.

> Trux was developed for my project management & analytics application, **Trakktion** and was inspired by [Flux](https://facebook.github.io/flux/) concepts. After developing Trux, I felt it was working quite nicely for me and thought others might find it useful, so I decided to turn it into its own thing.

# Documentation

## Getting Started

Kicking off with Trux is super simple. The following code illustrates a very basic example of how to use Trux.

First, let's define a `TruxModel`, set its data then define a React component. We will then render the component to the DOM.

```javascript
/**
 * Set our variables.
 */
var myData = {'thing':"Keep on truxin'"};
var myModel = new TruxModel('myModel').setData(myData);
var MyComponent = React.createClass({

    /**
     * Pass in the model via the component props.
     */
    propTypes: {
        model:React.PropTypes.object
    },

    /**
     * Set a reference to the model in the component's state.
     */
    getInitialState: function () {
        return {
            model:this.props.model
        }
    },

    /**
     * When the component mounts, set a truxId property on the component.
     * Bind the component to the model.
     */
    componentDidMount: function () {
        this.truxId = 'MyComponent';
        this.state.model.bindComponent(this);
    },

    /**
     * Remember to unbind the component when the component unmounts.
     */
    componentWillUnmount: function () {
        this.state.model.unbindComponent(this);
    },

    /**
     * The method called by Trux's broadcast method
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
 */
ReactDOM.render(<MyComponent model={myModel} />, document.getElementById('my-view'));
```

Now we can change the Model's data and call the model's `emitChangeEvent` method.

```
setTimeout(function() {
    myModel.data.thing = "Don't trux on me";
    myModel.emitChangeEvent();
}, 2000);
```

After the `setTimeout` runs, `MyComponent` will re render and the new value for `thing` will be displayed.
