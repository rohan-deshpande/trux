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
        "Truxflower Samurai",
        "Don't trux me, trux yourself",
        "Ain't no party like trux app party cuz a trux app party don't stop!",
        "Let's talk about trux baby",
        "I like big trux and I cannot lie"
    ];
    myModel.data.thing = things[Math.floor(Math.random() * things.length)];
    myModel.emitChangeEvent();
}, 2000);
