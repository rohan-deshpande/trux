var model = new TruxModel('model');
var collection = new TruxCollection('collection', TruxModel);

var TestModel = function () {
    TruxModel.call(this, 'testModel');
    this.prototype = TruxModel;
};

var tm = new TestModel();

console.log(tm);

var App = React.createClass({
    render:function () {
        return <h2>Hello World</h2>;
    }
});

ReactDOM.render(<App/>, document.getElementById('app'));
