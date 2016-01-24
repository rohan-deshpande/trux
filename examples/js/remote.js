
// Set some constants we'll be using in this example.

var API = 'https://api.parse.com/1/classes/';
var PARSE_HEADERS = {
    'X-Parse-Application-Id':'hZCMU3Jy9R6SfMqONzRVXQ0u7JXKCEVSkoWe7GMk',
    'X-Parse-REST-API-Key':'wTkqGReVql0lwym2vjObCpMElaGn3nK9v4aeSkCp',
    'Content-Type':'application/json',
    'Accept':null,
    'Cache-Control':null
};

// Intiialize the Parse object.

Parse.initialize("hZCMU3Jy9R6SfMqONzRVXQ0u7JXKCEVSkoWe7GMk", "4bhdnwddpjR0yVKzbMYmQpthI0RJlX14QED1YJ9K");

// Define a custom TruxModel constructor.

var Movie = function (data) {
    TruxModel.call(this, data);

    // set the model's id, parse uses the `objectId` key.

    this.id = data.objectId;

    // set the request headers for the model.

    this.setRequestOptions({'headers':PARSE_HEADERS});

    // custom method for getting the movie title.

    this.getTitle = function () {
        return this.data.title;
    };

    // custom method for getting the movie genre.

    this.getGenre = function () {
        return this.data.genre;
    };

    // set the REST routes for the model.

    this.PUT = API + 'Movies/' + this.id;
    this.GET = API + 'Movies/' + this.id;
};

// Create a new TruxCollection.

var Movies = new TruxCollection(Movie);

//Parse requires us to set specific headers in order to interact with their REST API.

Movies.setRequestOptions({
    'headers':PARSE_HEADERS
});

// Set the GET route for the collection.

Movies.GET = API + 'Movies';

// Request its data and then render the List component to the DOM.

Movies.request({
    onDone:function (response) {
        Movies.setModels(response.results);

        ReactDOM.render(
            <div className='container'>
                <List collection={Movies} />
            </div>, document.getElementById('app')
        );
    }
});

var Item = React.createClass({

    getInitialState:function () {
        return {
            model:this.props.model,
            title:this.props.model.getTitle(),
            genre:this.props.model.getGenre(),
            edit:false
        };
    },

    componentDidMount:function () {
        console.log(this.state.model);
    },

    handleEdit:function (e) {
        e.preventDefault();

        var edit = (this.state.edit === false) ? true : false;

        this.setState({edit:edit});
    },

    handleTitleChange:function (e) {
        this.setState({title:e.target.value});
    },

    handleGenreChange:function (e) {
        this.setState({genre:e.target.value});
    },

    handleSubmit:function (e) {
        e.preventDefault();

        var model = this.state.model;
        var data = {
            title:this.state.title,
            genre:this.state.genre
        };

        model.update(JSON.stringify(data), {
            onDone:function (updateResponse) {
                model.fetch({
                    onDone:function (fetchResponse) {
                        model.setData(fetchResponse).persist();
                    }
                });
            }
        });
    },

    render:function () {
        return (
            <div className='card-panel blue-text'>
                <h4>
                    {this.state.model.getTitle()}
                    <small>
                        &nbsp;({this.state.model.getGenre()})
                    </small>
                    <a className='btn-floating waves-effect waves-light red right' onClick={this.handleEdit}>
                        <i className="material-icons">
                            {(this.state.edit === false) ? 'edit' : 'close'}
                        </i>
                    </a>
                </h4>
                <form
                    className={(this.state.edit === false) ? 'hide' : 'col s12'}
                    onSubmit={this.handleSubmit}
                >
                    <div className='row'>
                        <div className='col s6'>
                            <label>Title</label>
                            <input
                                ref='title'
                                type='text'
                                defaultValue={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className='col s6'>
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
                        <i className="material-icons left">cloud</i>
                    </button>
                </form>
            </div>
        );
    }
});

var List = React.createClass({

    getInitialState:function () {
        return {
            collection:this.props.collection
        };
    },

    componentDidMount:function () {
        this.truxId = 'List';
        this.state.collection.bindComponent(this);
    },

    componentWillUnmount:function () {
        this.state.collection.unbindComponent(this);
    },

    appDataDidChange:function () {
        this.forceUpdate();
    },

    render:function () {
        return (
            <div className='cards'>
            <h3>My Favourite Movies</h3> {
                this.state.collection.models.map(function (item, i) {
                    return (
                        <Item model={item} key={item.id} />
                    );
                })
            }
            </div>
        );
    }
});
