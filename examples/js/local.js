var Library = React.createClass({

    /**
     * Pass the collection to the component via its props.
     */
    propTypes:{
        collection:React.PropTypes.object.isRequired
    },

    /**
     * Set a reference to the collection in the component's state.
     */
    getInitialState:function () {
        return {
            collection:this.props.collection
        };
    },

    /**
     * Set the component's truxId and bind it to the collection
     */
    componentDidMount:function () {
        this.truxId = 'Library';
        this.state.collection.bindComponent(this);
    },

    /**
     * Make sure to unbind the component when the component unmounts.
     */
    componentWillUnmount:function () {
        this.state.collection.unbindComponent(this);
    },

    /**
     * Method required to re render the component when the data store emits a change event
     */
    appDataDidChange:function () {
        this.forceUpdate();
    },

    /**
     * Render the component
     */
    render:function () {
        var _this = this;

        return (
            <div>
                <h5>
                    This will get printed to the library catalogue:
                </h5>
                <ul> {
                    this.state.collection.models.map(function (model) {
                        return (
                            <li key={model.getId()}>
                                <b>Title</b>: {model.getTitle()}<br/>
                                <b>Author</b>: {model.getAuthor()}
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
});

var Book = React.createClass({

    /**
     * Pass the model and index property to the component via its props
     */
    propTypes:{
        model:React.PropTypes.object.isRequired,
        index:React.PropTypes.number.isRequired
    },

    /**
     * Set a reference to the model in the component's state
     */
    getInitialState:function () {
        return {
            model:this.props.model
        };
    },

    /**
     * Set the component's truxId and bind it to the model
     */
    componentDidMount:function () {
        this.truxId = 'Book ' + this.props.index;
        this.state.model.bindComponent(this);
    },

    /**
     * Make sure to unbind the component when the component unmounts.
     */
    componentWillUnmount:function () {
        this.state.model.unbindComponent();
    },

    /**
     * Handles the change event for the input fields.
     * @param {string} key - the data key to change
     * @param {object} e - event object
     */
    handleDataChange:function (key, e) {
        e.preventDefault();

        this.state.model.data[key] = e.target.value;
    },

    /**
     * Handles the submit event for the form
     * @param {object} e - event object
     */
    handleSubmit:function (e) {
        e.preventDefault();

        this.state.model.updateLocal();
    },

    /**
     * Render the component
     */
    render:function () {
        var model = this.props.model;

        return (
            <div className='card'>
                <form onSubmit={this.handleSubmit}>
                    <h4>
                        {'Book ' + this.props.index}
                    </h4>
                    <div className='row'>
                        <div className='col s6'>
                            <p>
                                <label>
                                    Title
                                </label>
                                <input
                                    type='text'
                                    defaultValue={model.getTitle()}
                                    onChange={this.handleDataChange.bind(null, 'title')}
                                />
                            </p>
                        </div>
                        <div className='col s6'>
                            <p>
                                <label>
                                    Author
                                </label>
                                <input
                                    type='text'
                                    defaultValue={model.getAuthor()}
                                    onChange={this.handleDataChange.bind(null, 'author')}
                                />
                            </p>
                        </div>
                    </div>
                    <button type='submit'>
                        Save
                    </button>
                </form>
            </div>
        );
    }
});

/**
 * Create an Editor component
 */
var Editor = React.createClass({

    propTypes:{
        collection:React.PropTypes.object.isRequired
    },

    /**
     * Set the collection.
     *
     */
    getInitialState:function () {
        return {
            collection:this.props.collection
        };
    },

    /**
     * Render the component. Loop through the collection's models and render a Book component for each.
     *
     */
    render:function () {
        var _this = this;

        return (
            <div>
                <h3>
                    Change this:
                </h3>
                <div> {
                    this.state.collection.models.map(function (model, i) {
                        return <Book key={model.getId()} model={model} index={i}/>;
                    })
                }
                </div>
            </div>
        );
    }
});

(function (window) {
    'use strict';

    /**
     * Define a global app object.
     *
     */
    window.app = {

        /**
         * Our dummy data.
         *
         */
        books:[{
                'id':performance.now(),
                'title':'Lord Of The Kings',
                'author':'JRR Molkein'
            }, {
                'id':performance.now(),
                'title':'Clash Of Rings',
                'author':'Jo RRG Fartin'
            }, {
                'id':performance.now(),
                'title':'Magic Man',
                'author':'Lame E Fist'
            }
        ],

        /**
         * Load the data into local storage for use in this example.
         *
         */
        setupData:function () {
            localStorage.setItem('truxExampleData', JSON.stringify(this.books));
            return this;
        },

        /**
         * Setup the custom Book model.
         *
         */
        setupBook:function () {

            /**
             * Extend Trux.Model and create a new class; Book.
             *
             */
            Trux.models.Book = Trux.Model.extend({

                /**
                 * Sets the id of the model.
                 *
                 */
                setId: function (id) {
                    this.id = id;
                },

                /**
                 * Gets the id of the model.
                 *
                 */
                getId: function () {
                    return this.id;
                },

                /**
                 * Sets the title of the book.
                 *
                 */
                getTitle: function () {
                    return this.data.title;
                },

                /**
                 * Gets the author of the book.
                 *
                 */
                getAuthor: function () {
                    return this.data.author;
                },

                /**
                 * Local storage update method.
                 *
                 */
                updateLocal: function () {
                    var stored = JSON.parse(localStorage.getItem('truxExampleData'));
                    var item = false;
                    var length = stored.length;
                    var i;

                    for (i = 0 ; i < length ; i ++) {
                        if (stored[i].id == this.getId()) {
                            item = stored[i];
                        }
                    }

                    item.title = this.data.title;
                    item.author = this.data.author;

                    localStorage.setItem('truxExampleData', JSON.stringify(stored));

                    this.persist();
                }
            }, function (_this) {

                /**
                 * Set the id of the Book on instantiation.
                 *
                 */
                _this.setId(_this.data.id);
            });

            return this;
        },

        /**
         * Setup the Genre collection.
         *
         */
        setupGenre:function () {
            var _this = this;

            Trux.collections.Genre = Trux.Collection.extend({

                /**
                 * Custom method for fetching data from local storage.
                 *
                 */
                fetchLocal: function (key) {
                    this.setModels(JSON.parse(localStorage.getItem(key)));
                }
            });

            return this;
        },

        /**
         * Run the app.
         *
         */
        run:function () {

            this.setupData()
                .setupBook()
                .setupGenre();

            var fantasy = new Trux.collections.Genre(Trux.models.Book);
            fantasy.fetchLocal('truxExampleData');

            console.log(fantasy);

            ReactDOM.render(
                <div>
                    <div>
                        <Library collection={fantasy} />
                    </div>
                    <div>
                        <Editor collection={fantasy} />
                    </div>
                </div>, document.getElementById('app')
            );
        }
    };
}(window));

app.run();
