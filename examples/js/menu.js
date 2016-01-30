/**
 * Menu component for the examples.
 *
 */
var Menu = React.createClass({

    render:function () {
        return (
            <nav className='demo'>
                <a href="index.html" className='brand'>Demos</a>
                <input id="bmenub" type="checkbox" className="show" />
                <label htmlFor="bmenub" className="burger pseudo button toggle">menu</label>
                <div className='menu'>
                    <a className='button' href="intro.html">
                        Intro
                    </a>
                    <a className='button' href="local.html">
                        Local
                    </a>
                    <a className='button' href="remote.html">
                        Remote
                    </a>
                </div>
            </nav>
        );
    }
});

ReactDOM.render(
    <div>
        <Menu />
    </div>, document.getElementById('menu')
);
