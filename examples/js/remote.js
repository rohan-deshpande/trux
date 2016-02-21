/**
 * Set some constants we'll be using in this example.
 *
 */
var PARSE_API = 'https://api.parse.com/1/classes/';
var PARSE_HEADERS = {
    'X-Parse-Application-Id':'hZCMU3Jy9R6SfMqONzRVXQ0u7JXKCEVSkoWe7GMk',
    'X-Parse-REST-API-Key':'wTkqGReVql0lwym2vjObCpMElaGn3nK9v4aeSkCp',
    'Content-Type':'application/json',
    'Accept':null,
    'Cache-Control':null
};

/**
 * Intiialize the Parse object.
 *
 */
Parse.initialize("hZCMU3Jy9R6SfMqONzRVXQ0u7JXKCEVSkoWe7GMk", "4bhdnwddpjR0yVKzbMYmQpthI0RJlX14QED1YJ9K");

/**
 * Define a custom TruxModel constructor.
 *
 */
Trux.models.Movie = Trux.Model.extend({

    /**
     * Set the model's id
     *
     */
    setId: function (id) {
        this.id = id;
    },

    /**
     * Get the model's id
     *
     */
    getId:function () {
        return this.id;
    },

    /**
     * Get the movie title.
     *
     */
    getTitle :function () {
        return this.data.title;
    },

    /**
     * Get the movie genre.
     *
     */
    getGenre: function () {
        return this.data.genre;
    }
}, function(_this) {
    /**
     * Perform these setup operations on each model when it is instantiated.
     * Set each model's id.
     * Set the custom request options needed for each model to communicate with the API.
     * Set the RESTful PUT and GET routes.
     * @see Trux.extend
     *
     */
    _this.setId(_this.data.objectId);
    _this.setRequestOptions({
        'headers':PARSE_HEADERS,
        'dataType':'json'
    });
    _this.PUT = PARSE_API + 'Movies/' + _this.id;
    _this.GET = PARSE_API + 'Movies/' + _this.id;
});

/**
 * Create a new TruxCollection.
 * Parse requires us to set specific headers in order to interact with their REST API.
 *
 */
var Movies = new Trux.Collection(Trux.models.Movie).setRequestOptions({
    'headers':PARSE_HEADERS
});

/**
 * Set the GET route for the collection.
 *
 */
Movies.GET = PARSE_API + 'Movies';

/**
 * Request its data and then render the List component to the DOM.
 *
 */
Movies.fetch({
    onDone:function (response) {
        /**
         * Parse returns responses inside a results key so we need to call setModels manually
         */
        Movies.setModels(response.results);

        ReactDOM.render(
            <div>
                <List collection={Movies} />
            </div>, document.getElementById('app')
        );
    }
});

/**
 * Create an Item component.
 */
var Item = React.createClass({

    /**
     * Initial state for the Item component.
     */
    getInitialState:function () {
        return {
            model:this.props.model,
            title:this.props.model.getTitle(),
            genre:this.props.model.getGenre(),
            edit:false
        };
    },

    /**
     * Handle the edit state of the component.
     *
     */
    handleEdit:function (e) {
        e.preventDefault();

        var edit = (this.state.edit === false) ? true : false;

        this.setState({edit:edit});
    },

    /**
     * Handle the movie's title change.
     *
     */
    handleTitleChange:function (e) {
        this.setState({title:e.target.value});
    },

    /**
     * Handle the movie's genre change.
     *
     */
    handleGenreChange:function (e) {
        this.setState({genre:e.target.value});
    },

    /**
     * Handle the submit event for each Item.
     *
     */
    handleSubmit:function (e) {
        e.preventDefault();

        var _this = this;
        var model = this.state.model;
        var data = {
            "title":this.state.title,
            "genre":this.state.genre
        };

        /**
         * A Trux.Model's update method expects the model to be returned from the server to ensure data consistency.
         * Parse doesn't do this, instead it only sends back the updatedAt value.
         * To ensure our data is consistent, we'll request the model once again from Parse.
         * This isn't very efficient, so in a real use case you would override the native fetch method with your own.
         *
         */
        model.update(data, {
            onDone:function (u) {
                model.fetch({
                    onDone:function (f) {
                        /**
                         * Sets the Trux.Model's data and persists it across bound components.
                         * Again we need to do this manually due to Parse not sending back a complete object on update.
                         *
                         */
                        model.setData(f);
                        model.persist();
                        _this.setState({edit:false});
                    }
                });
            },
            onFail:function (xhr, response, e) {
                console.log(response);
            }
        });
    },

    /**
     * Render the Item component.
     *
     */
    render:function () {
        return (
            <div className='card'>
                <h4>
                    {this.state.model.getTitle()}
                    <small>
                        &nbsp;({this.state.model.getGenre()})
                    </small>
                    <button className={(this.state.edit) ? 'error small' : 'small'} onClick={this.handleEdit}>
                        {(this.state.edit === false) ? 'edit' : 'close'}
                    </button>
                </h4>
                <form
                    className={(this.state.edit === false) ? 'hide' : 'col s12'}
                    onSubmit={this.handleSubmit}
                >
                    <div className='row'>
                        <div>
                            <label>Title</label>
                            <input
                                ref='title'
                                type='text'
                                defaultValue={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div>
                            <label>Genre</label>
                            <input
                                ref='genre'
                                type='text'
                                defaultValue={this.state.genre}
                                onChange={this.handleGenreChange}
                            />
                        </div>
                    </div>
                    <button className='btn' type='submit'>
                        Update
                    </button>
                </form>
            </div>
        );
    }
});

/**
 * Create a List component.
 *
 */
var List = React.createClass({

    //
    /**
     * Initial state for the List component.
     *
     */
    getInitialState:function () {
        return {
            collection:this.props.collection
        };
    },

    /**
     * Set the component's truxId and bind it to its data store.
     *
     */
    componentDidMount:function () {
        this.truxId = 'List';
        this.state.collection.bindComponent(this);
    },

    /**
     * Unbind the component when it unmounts.
     *
     */
    componentWillUnmount:function () {
        this.state.collection.unbindComponent(this);
    },

    /**
     * Called from the Trux class List is bound to
     *
     */
    appDataDidChange:function () {
        this.forceUpdate();
    },

    /**
     * Render the component.
     *
     */
    render:function () {
        return (
            <div>
                <h3>
                    My Favourite Movies
                </h3>
                <div className='cards'> {
                    this.state.collection.models.map(function (item, i) {
                        return (
                            <Item model={item} key={item.id} />
                        );
                    })
                }
                </div>
            </div>
        );
    }
});
