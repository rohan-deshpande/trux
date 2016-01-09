var Library = React.createClass({

    propTypes:{
        collection:React.PropTypes.object.isRequired
    },

    getInitialState:function () {
        return {
            collection:this.props.collection
        };
    },

    componentDidMount:function () {
        this.truxId = 'Library';
        this.state.collection.bindComponent(this);
    },

    componentWillUnmount:function () {
        this.state.collection.unbindComponent(this);
    },

    appDataDidChange:function () {
        this.forceUpdate();
    },

    render:function () {
        var _this = this;

        return (
            <div>
                <h3>
                    This will get printed to the library catalogue:
                </h3>
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

    propTypes:{
        model:React.PropTypes.object.isRequired,
        index:React.PropTypes.number.isRequired
    },

    getInitialState:function () {
        return {
            model:this.props.model
        };
    },

    componentDidMount:function () {
        this.truxId = 'Book ' + this.props.index;
        this.state.model.bindComponent(this);
    },

    componentWillUnmount:function () {
        this.state.model.unbindComponent();
    },

    handleDataChange:function (key, e) {
        e.preventDefault();

        this.state.model.data[key] = e.target.value;
    },

    handleSubmit:function (e) {
        e.preventDefault();

        this.state.model.updateLocal();
    },

    render:function () {
        var model = this.props.model;

        return (
            <form onSubmit={this.handleSubmit}>
                <h4>
                    {'Book ' + this.props.index}
                </h4>
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
                <button type='submit'>
                    Save
                </button>
            </form>
        );
    }
});

var Editor = React.createClass({

    propTypes:{
        collection:React.PropTypes.object.isRequired
    },

    getInitialState:function () {
        return {
            collection:this.props.collection
        };
    },

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

    window.app = {

        trux:{
            models:{},
            collections:{},
            store:{}
        },

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

        setupData:function () {
            localStorage.setItem('truxExampleData', JSON.stringify(this.books));
            return this;
        },

        setupBook:function () {
            this.trux.models.Book = function (data) {
                TruxModel.call(this, data.title);
                this.prototype = TruxModel;

                this.setData(data);

                this.getTitle = function () {
                    return this.data.title;
                };

                this.getAuthor = function () {
                    return this.data.author;
                };

                this.updateLocal = function() {
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

                    if (this.collection) {
                        this.collection.emitChangeEvent();
                    } else {
                        this.emitChangeEvent();
                    }
                };
            };

            return this;
        },

        setupGenre:function () {
            var _this = this;

            this.trux.collections.Genre =  function(name) {
                TruxCollection.call(this, name, _this.trux.models.Book);
                this.prototype = TruxCollection;

                this.requestLocal = function (key) {
                    var models = JSON.parse(localStorage.getItem(key));

                    this.setModels(models);
                };
            };

            return this;
        },

        run:function () {

            this.setupData()
            .setupBook()
            .setupGenre();

            var genre = new app.trux.collections.Genre('fantasy');
            genre.requestLocal('truxExampleData');

            ReactDOM.render(
                <div>
                    <div>
                        <Library collection={genre} />
                    </div>
                    <div>
                        <Editor collection={genre} />
                    </div>
                </div>, document.getElementById('app')
            );
        }
    };
}(window));

app.run();
