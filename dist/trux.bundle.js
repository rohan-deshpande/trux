!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.qwest=e()}}(function(){var define,module,exports;return function e(t,n,o){function r(i,a){if(!n[i]){if(!t[i]){var p="function"==typeof require&&require;if(!a&&p)return p(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[i]={exports:{}};t[i][0].call(c.exports,function(e){var n=t[i][1][e];return r(n?n:e)},c,c.exports,e,t,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,t,n){!function(e){"use strict";var n=function(e){var t=function(e,t,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)},n=function(e,o,r){var s,i,a;if("[object Array]"===Object.prototype.toString.call(o))for(s=0,i=o.length;i>s;s++)n(e+"["+("object"==typeof o[s]?s:"")+"]",o[s],r);else if(o&&"[object Object]"===o.toString())for(a in o)o.hasOwnProperty(a)&&(e?n(e+"["+a+"]",o[a],r,t):n(a,o[a],r,t));else if(e)t(r,e,o);else for(a in o)t(r,a,o[a]);return r};return n("",e,[]).join("&").replace(/%20/g,"+")};"object"==typeof t&&"object"==typeof t.exports?t.exports=n:"function"==typeof define&&define.amd?define([],function(){return n}):e.param=n}(this)},{}],2:[function(e,t,n){!function(e){function t(e){return"function"==typeof e}function n(e){return"object"==typeof e}function o(e){"undefined"!=typeof setImmediate?setImmediate(e):"undefined"!=typeof process&&process.nextTick?process.nextTick(e):setTimeout(e,0)}var r;e[0][e[1]]=function s(e){var i,a=[],p=[],u=function(e,t){return null==i&&null!=e&&(i=e,a=t,p.length&&o(function(){for(var e=0;e<p.length;e++)p[e]()})),i};return u.then=function(u,c){var f=s(e),d=function(){function e(o){var s,i=0;try{if(o&&(n(o)||t(o))&&t(s=o.then)){if(o===f)throw new TypeError;s.call(o,function(){i++||e.apply(r,arguments)},function(e){i++||f(!1,[e])})}else f(!0,arguments)}catch(a){i++||f(!1,[a])}}try{var o=i?u:c;t(o)?e(o.apply(r,a||[])):f(i,a)}catch(s){f(!1,[s])}};return null!=i?o(d):p.push(d),f},e&&(u=e(u)),u}}("undefined"==typeof t?[window,"pinkySwear"]:[t,"exports"])},{}],qwest:[function(_dereq_,module,exports){module.exports=function(){var global=window||this,pinkyswear=_dereq_("pinkyswear"),jparam=_dereq_("jquery-param"),defaultXdrResponseType="json",defaultDataType="post",limit=null,requests=0,request_stack=[],getXHR=function(){return global.XMLHttpRequest?new global.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},xhr2=""===getXHR().responseType,qwest=function(method,url,data,options,before){method=method.toUpperCase(),data=data||null,options=options||{};var nativeResponseParsing=!1,crossOrigin,xhr,xdr=!1,timeoutInterval,aborted=!1,attempts=0,headers={},mimeTypes={text:"*/*",xml:"text/xml",json:"application/json",post:"application/x-www-form-urlencoded"},accept={text:"*/*",xml:"application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",json:"application/json; q=1.0, text/*; q=0.8, */*; q=0.1"},i,j,serialized,response,sending=!1,delayed=!1,timeout_start,promise=pinkyswear(function(e){if(e["catch"]=function(t){return e.then(null,t)},e.complete=function(t){return e.then(t,t)},"pinkyswear"in options)for(i in options.pinkyswear)e[i]=options.pinkyswear[i];return e.send=function(){if(!sending){if(requests==limit)return void request_stack.push(e);if(++requests,sending=!0,timeout_start=(new Date).getTime(),xhr=getXHR(),crossOrigin&&("withCredentials"in xhr||!global.XDomainRequest||(xhr=new XDomainRequest,xdr=!0,"GET"!=method&&"POST"!=method&&(method="POST"))),xdr?xhr.open(method,url):(xhr.open(method,url,options.async,options.user,options.password),xhr2&&options.async&&(xhr.withCredentials=options.withCredentials)),!xdr)for(var t in headers)headers[t]&&xhr.setRequestHeader(t,headers[t]);if(xhr2&&"document"!=options.responseType&&"auto"!=options.responseType)try{xhr.responseType=options.responseType,nativeResponseParsing=xhr.responseType==options.responseType}catch(n){}xhr2||xdr?(xhr.onload=handleResponse,xhr.onerror=handleError):xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()},"auto"!=options.responseType&&"overrideMimeType"in xhr&&xhr.overrideMimeType(mimeTypes[options.responseType]),before&&before(xhr),xdr?(xhr.onprogress=function(){},xhr.ontimeout=function(){},xhr.onerror=function(){},setTimeout(function(){xhr.send("GET"!=method?data:null)},0)):xhr.send("GET"!=method?data:null)}},e}),handleResponse=function(){var i,responseType;if(--requests,sending=!1,(new Date).getTime()-timeout_start>=options.timeout)return void(options.attempts&&++attempts==options.attempts?promise(!1,[xhr,response,new Error("Timeout ("+url+")")]):promise.send());request_stack.length&&request_stack.shift().send();try{if(nativeResponseParsing&&"response"in xhr&&null!==xhr.response)response=xhr.response;else if("document"==options.responseType){var frame=document.createElement("iframe");frame.style.display="none",document.body.appendChild(frame),frame.contentDocument.open(),frame.contentDocument.write(xhr.response),frame.contentDocument.close(),response=frame.contentDocument,document.body.removeChild(frame)}else{if(responseType=options.responseType,"auto"==responseType)if(xdr)responseType=defaultXdrResponseType;else{var ct=xhr.getResponseHeader("Content-Type")||"";responseType=ct.indexOf(mimeTypes.json)>-1?"json":ct.indexOf(mimeTypes.xml)>-1?"xml":"text"}switch(responseType){case"json":try{response="JSON"in global?JSON.parse(xhr.responseText):eval("("+xhr.responseText+")")}catch(e){throw"Error while parsing JSON body : "+e}break;case"xml":try{global.DOMParser?response=(new DOMParser).parseFromString(xhr.responseText,"text/xml"):(response=new ActiveXObject("Microsoft.XMLDOM"),response.async="false",response.loadXML(xhr.responseText))}catch(e){response=void 0}if(!response||!response.documentElement||response.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:response=xhr.responseText}}if("status"in xhr&&!/^2|1223/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";promise(!0,[xhr,response])}catch(e){promise(!1,[xhr,response,e])}},handleError=function(e){--requests,promise(!1,[xhr,null,new Error("Connection aborted")])};switch(options.async=!("async"in options)||!!options.async,options.cache="cache"in options&&!!options.cache,options.dataType="dataType"in options?options.dataType.toLowerCase():defaultDataType,options.responseType="responseType"in options?options.responseType.toLowerCase():"auto",options.user=options.user||"",options.password=options.password||"",options.withCredentials=!!options.withCredentials,options.timeout="timeout"in options?parseInt(options.timeout,10):3e4,options.attempts="attempts"in options?parseInt(options.attempts,10):1,i=url.match(/\/\/(.+?)\//),crossOrigin=i&&!!i[1]&&i[1]!=location.host,"ArrayBuffer"in global&&data instanceof ArrayBuffer?options.dataType="arraybuffer":"Blob"in global&&data instanceof Blob?options.dataType="blob":"Document"in global&&data instanceof Document?options.dataType="document":"FormData"in global&&data instanceof FormData&&(options.dataType="formdata"),options.dataType){case"json":data=null!==data?JSON.stringify(data):data;break;case"post":data=jparam(data)}if(options.headers){var format=function(e,t,n){return t+n.toUpperCase()};for(i in options.headers)headers[i.replace(/(^|-)([^-])/g,format)]=options.headers[i]}return"Content-Type"in headers||"GET"==method||options.dataType in mimeTypes&&mimeTypes[options.dataType]&&(headers["Content-Type"]=mimeTypes[options.dataType]),headers.Accept||(headers.Accept=options.responseType in accept?accept[options.responseType]:"*/*"),crossOrigin||"X-Requested-With"in headers||(headers["X-Requested-With"]="XMLHttpRequest"),options.cache||"Cache-Control"in headers||(headers["Cache-Control"]="no-cache"),"GET"==method&&data&&"string"==typeof data&&(url+=(/\?/.test(url)?"&":"?")+data),options.async&&promise.send(),promise};return{base:"",get:function(e,t,n,o){return qwest("GET",this.base+e,t,n,o)},post:function(e,t,n,o){return qwest("POST",this.base+e,t,n,o)},put:function(e,t,n,o){return qwest("PUT",this.base+e,t,n,o)},"delete":function(e,t,n,o){return qwest("DELETE",this.base+e,t,n,o)},map:function(e,t,n,o,r){return qwest(e.toUpperCase(),this.base+t,n,o,r)},xhr2:xhr2,limit:function(e){limit=e},setDefaultXdrResponseType:function(e){defaultXdrResponseType=e.toLowerCase()},setDefaultDataType:function(e){defaultDataType=e.toLowerCase()}}}()},{"jquery-param":1,pinkyswear:2}]},{},[1,2])("qwest")}),function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var o=e.prototype,r=this,s=r.EventEmitter;o.getListeners=function(e){var t,n,o=this._getEvents();if(e instanceof RegExp){t={};for(n in o)o.hasOwnProperty(n)&&e.test(n)&&(t[n]=o[n])}else t=o[e]||(o[e]=[]);return t},o.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},o.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},o.addListener=function(e,n){var o,r=this.getListenersAsObject(e),s="object"==typeof n;for(o in r)r.hasOwnProperty(o)&&t(r[o],n)===-1&&r[o].push(s?n:{listener:n,once:!1});return this},o.on=n("addListener"),o.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},o.once=n("addOnceListener"),o.defineEvent=function(e){return this.getListeners(e),this},o.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},o.removeListener=function(e,n){var o,r,s=this.getListenersAsObject(e);for(r in s)s.hasOwnProperty(r)&&(o=t(s[r],n),o!==-1&&s[r].splice(o,1));return this},o.off=n("removeListener"),o.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},o.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},o.manipulateListeners=function(e,t,n){var o,r,s=e?this.removeListener:this.addListener,i=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(o=n.length;o--;)s.call(this,t,n[o]);else for(o in t)t.hasOwnProperty(o)&&(r=t[o])&&("function"==typeof r?s.call(this,o,r):i.call(this,o,r));return this},o.removeEvent=function(e){var t,n=typeof e,o=this._getEvents();if("string"===n)delete o[e];else if(e instanceof RegExp)for(t in o)o.hasOwnProperty(t)&&e.test(t)&&delete o[t];else delete this._events;return this},o.removeAllListeners=n("removeEvent"),o.emitEvent=function(e,t){var n,o,r,s,i,a=this.getListenersAsObject(e);for(s in a)if(a.hasOwnProperty(s))for(n=a[s].slice(0),r=n.length;r--;)o=n[r],o.once===!0&&this.removeListener(e,o.listener),i=o.listener.apply(this,t||[]),i===this._getOnceReturnValue()&&this.removeListener(e,o.listener);return this},o.trigger=n("emitEvent"),o.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},o.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},o._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},o._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=s,e},"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof module&&module.exports?module.exports=e:r.EventEmitter=e}.call(this);
(function () {
    'use strict';

    /**
     * The Trux namespace.
     *
     * @namespace
     * @global
     */
    this.Trux = {
        /**
         * Extends a base class and returns a new class.
         * If no base parameter is passed, Trux.Model is assumed.
         *
         * @deprecated 
         * @param {Object} props - custom props for the new class
         * @param {Boolean|Function} setup - an optional function to run within the new class' constructor
         * @param {Function} base - the base constructor to create this sub class from
         * @return {Function} _constructor - the new constructor
         */
        extend: function (props, setup, base) {
            console.log('Trux.extend will be deprecated soon, please use Trux.Model.extend or Trux.Collection.extend instead');

            var _base = (typeof base === 'function') ? base : Trux.Model;
            var TruxClassExtension = function (arg) {
                _base.call(this, arg);

                if (typeof setup === 'function') {
                    setup(this);
                }
            };

            TruxClassExtension.prototype = Object.create(_base.prototype);

            if (typeof props !== 'object') return TruxClassExtension;

            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    TruxClassExtension.prototype[prop] = props[prop];
                }
            }

            return TruxClassExtension;
        },

        /**
         * Store for custom Trux Model classes.
         *
         * @prop {Object} models - an object to store custom Trux Model classes
         */
        models: {},

        /**
         * Store for custom Trux Collection classes.
         *
         * @prop {Object} collections - an object to store custom Trux Collection classes
         */
        collections: {},

        /**
         * The base constructor for models and collections.
         *
         * @constructor
         */
        Base: function () {

            /**
             * Private reference to this instance
             *
             * @prop {Object} _this - Private reference to this instance
             * @private
             */
            var _this = this;

            /**
             * Reference for bound React components
             *
             * @prop {Object} components - reference for bound React components
             */
            this.components = {};

            /**
             * The base Event Emitter
             *
             * @prop {Object} emitter - the model's Event Emitter
             */
            this.emitter = new EventEmitter();

            /**
             * Add the change event listener to the Event Emitter
             *
             */
            this.emitter.addListener('change', broadcast);

            /**
             * Broadcast changes to all bound React components.
             *
             * @implements component.appDataDidChange
             * @return void
             */
            function broadcast() {
                if (!Object.keys(_this.components).length) return;

                for (var prop in _this.components) {
                    if(_this.components.hasOwnProperty(prop)) {
                        _this.components[prop].appDataDidChange();
                    }
                }
            }

            /**
             * Request options which align with the qwest options argument for requests.
             *
             * @see https://github.com/pyrsmk/qwest#basics
             * @prop {Object} requestOptions - options to be set for the request
             */
            this.requestOptions = {};

            /**
             * The GET route for this object
             *
             * @prop {String} GET - the GET route for this object
             */
            this.GET = false;

            /**
             * The POST route for this object
             *
             * @prop {String} POST - the POST route for this object
             */
            this.POST = false;

            /**
             * The PUT route for this object
             * @prop {String} PUT - the PUT route for this object
             *
             */
            this.PUT = false;

            /**
             * The PATCH route for this object
             *
             * @prop {String} PATCH - the PATCH route for this object
             */
            this.PATCH = false;

            /**
             * The DELETE route for this object
             *
             * @prop {String} DELETE - the DELETE route for this object
             */
            this.DELETE = false;
        }
    };

    /**
     * Bind a React component to this Trux instance.
     * Bound components receive updates via this.broadcast.
     * Each component is required to have a unique truxId property set.
     * Should be called within the component's componentWillMount or componentDidMount methods.
     *
     * @param {Object} component - the React class to bind to this instance
     * @return void
     */
    Trux.Base.prototype.bindComponent = function (component) {
        this.components[component.truxId] = component;
    };

    /**
     * Unbinds a React component from this Trux instance.
     * Stops the component from receiving updates.
     * Should be called within the component's componentWillUnmount method.
     *
     * @param {Object} component - the React class to unbind from this instance
     * @return void
     */
    Trux.Base.prototype.unbindComponent = function (component) {
        if (typeof this.components[component.truxId] === 'undefined') return;

        delete this.components[component.truxId];
    };

    /**
     * Emits a change event from this Trux instance.
     *
     * @implements EventEmitter.emitEvent
     * @fires this.emitter.change
     * @return void
     */
    Trux.Base.prototype.emitChangeEvent = function () {
        this.emitter.emitEvent('change');
    };

    /**
     * Sets the options for the request.
     *
     * @param {Object} requestOptions - the options for all requests
     * @return {Object} this - this Trux class instance
     */
    Trux.Base.prototype.setRequestOptions = function (requestOptions) {
        this.requestOptions = requestOptions;

        return this;
    };
}.call(this));

(function (Trux) {
    'use strict';

    /**
     * A client side interface for a remote data Model.
     *
     * @param {Object} data - the data which defines this Model
     * @return {Object} this - this Model
     * @example
       //basic usage
       var MyModel = new Trux.Model({message:'hello world'});
     * @example
       //advanced usage
       Trux.models.User = Trux.extend({
            getName: function () {
                return this.data.name;
            }
       }, false);

       var Frodo = new Trux.models.User({name:'Frodo Baggins'});

       console.log(Frodo.getName()); // logs 'Frodo Baggins'
     * @constructor
     */
    Trux.Model = function (data) {

        /**
         * Inherit properties from Trux.Base.
         *
         */
        Trux.Base.call(this);

        /**
         * Private reference to this Model instance.
         *
         * @prop {Object} _this - private reference to this instance
         * @private
         */
        var _this = this;

        /**
         * Private backup of the Model's data.
         * Will store an empty object if no data was passed to the constructor.
         *
         * @prop {Object} _backup - private backup of the Model's data
         * @private
         */
        var _backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));

        /**
         * The data which defines this Model, initially null.
         *
         * @prop {Null|Object} data - the data which defines this Model, initially null
         */
        this.data = data;

        /**
         * The collection this Model belongs to, if it does belong to one. Initially false.
         *
         * @prop {Boolean|Object} collection - the collection this Model belongs to
         */
        this.collection = false;

        /**
         * Easy way of determining what kind of class this is.
         *
         * @prop {String} className - easy way of determining what kind of class this is
         */
        this.className = 'TruxModel';

        /**
         * Set the data for this Model instance.
         * Also sets the private _backup for this instance.
         *
         * @param {Object} data - the data that defines this Model
         * @return {Object} this - this Model
         */
        this.setData = function (data) {
            this.data = data;
            _backup = (!data || Object.keys(data).length === 0) ? {} : JSON.parse(JSON.stringify(data));
        };

        /**
         * Restores the Model's data from the privately stored _backup.
         *
         * @return {Object} this - this Model
         */
        this.restoreData = function () {
            this.data = (!_backup || Object.keys(_backup).length === 0) ? {} : JSON.parse(JSON.stringify(_backup));
        };

        return this;
    };

    /**
     * Inherit prototype methods from Trux.Base.
     *
     */
    Trux.Model.prototype = Object.create(Trux.Base.prototype);

    /**
     * Persits the Model's data throughout its bound components.
     * Emits either the Model's change event or, if it belongs to a Collection, fetches the collection and emits itschange event.
     *
     * @return void
     */
    Trux.Model.prototype.persist = function () {
        var collection = this.collection;

        if (collection) {
            collection.fetch({
                onDone: function () {
                    collection.emitChangeEvent();
                }
            });
        } else {
            this.emitChangeEvent();
        }
    };

    /**
     * Requests the remote data for the Model, then sets the Model data with the response.
     *
     * @implements qwest.get
     * @param {Object} options - optional onDone and onFail methods to run when promises are resolved
     * @return {Object} this - this Trux class instance
     */
    Trux.Model.prototype.fetch = function (options) {
        var _this = this;

        qwest.get(this.GET, null, this.requestOptions)
            .then(function (xhr, response) {
                if (typeof response !== 'object') return;

                _this.setData(response);

                if (typeof options.onDone === 'function') {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                if (typeof options.onFail === 'function') {
                    options.onFail(xhr, response, e);
                }
            });

        return this;
    };

    /**
     * Creates a new instance of this Model in the remote data store.
     *
     * @implements qwest.post
     * @param {Object} data - the data for the new Model
     * @param {Object} options - optional onDone and onFail methods to run once promises are resolved
     * @return {Object} this - this Trux class instance
     */
    Trux.Model.prototype.create = function (data, options) {
        var _this = this;

        qwest.post(this.POST, data, this.requestOptions)
            .then(function (xhr, response) {
                if (typeof response !== 'object') return;

                _this.setData(response);

                if (typeof options.onDone === 'function') {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                if (typeof options.onFail === 'function') {
                    options.onFail(xhr, response, e);
                }
            });

        return this;
    };

    /**
     * Updates this Model in the remote data store.
     *
     * @implements qwest.put
     * @implements EventEmitter.emitEvent
     * @param {Object} data - the new data for the Model
     * @param {Object} options - optional onDone and onFail methods to run once promises are resolved
     * @return {Object} this - this Trux class instance
     */
    Trux.Model.prototype.update = function (data, options) {
        var _this = this;

        qwest.put(this.PUT, data, this.requestOptions)
            .then(function (xhr, response) {
                if (typeof response !== 'object') return;

                _this.setData(response);
                _this.persist();

                if (typeof options.onDone === 'function') {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                _this.restoreData();
                _this.persist();

                if (typeof options.onFail === 'function') {
                    options.onFail(xhr, response, e);
                }
            });

        return this;
    };

    /**
     * Clears this Model's data property.
     *
     * @return void
     */
    Trux.Model.prototype.purge = function () {
        this.data = null;
    };

    /**
     * Extends Trux.Model and returns the constructor for the new class.
     *
     * @param {Object} props - custom props for the new class
     * @param {Boolean|Function} setup - an optional function to run within the new class' constructor
     * @return {Function} TruxModel - the new constructor
     */
    Trux.Model.extend = function (props, setup) {
        var TruxModel = function (data) {
            Trux.Model.call(this, data);

            if (typeof setup === 'function') {
                setup(this);
            }
        };

        TruxModel.prototype = Object.create(Trux.Model.prototype);

        if (typeof props !== 'object') return TruxModel;

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                TruxModel.prototype[prop] = props[prop];
            }
        }

        return TruxModel;
    };

    /**
     * Modifies the Trux.Model class with the passed properties.
     * This will enable all custom models to inherit the properties passed to this method.
     *
     * @param {Object} props - the props to add to the Trux.Model class
     * @return {Object} this - class instance
     */
    Trux.Model.modify = function (props) {
        if (typeof props !== 'object') return this;

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                Trux.Model.prototype[prop] = props[prop];
            }
        }

        return this;
    };
}(Trux));

(function (Trux) {
    'use strict';
    /**
     * A store for an array of models.
     *
     * @param {String} name - the name of this Collection
     * @param {Function} modelConstructor - a constructor for a Model
     * @return {Object} this - this Collection
     * @example
       //basic usage
       var MyCollection = new Trux.Collection(Trux.Model);
     * @example
       //advanced usage
       Trux.collections.Posts = Trux.extend({
            getCategories: function () {
                categories = [];

                this.models.forEach(function (model) {
                    categories.push(model.getCategory()); // getCategory would be a custom method on the Post model.
                });

                return categories;
            }
       }, false, Trux.Collection);

       var Blog = new Trux.collections.Posts(Trux.models.Post); //assumes you've created a custom Post model.

       console.log(Blog.getCategories()); // logs all your post's categories.
     * @constructor
     */
    Trux.Collection = function (modelConstructor) {

        Trux.Base.call(this);

        /**
         * Private reference to this Model instance.
         *
         * @prop {Object} _this - private reference to this instance
         * @private
         */
        var _this = this;

        /**
         * The Model class for the models contained within this collection.
         *
         * @prop {Object} modelConstructor - the Model class for the models contained within this collection
         */
        this.modelConstructor = modelConstructor;

        /**
         * The array of Models stored in this Collection.
         *
         * @prop {Array} models - an array of Models
         */
        this.models = [];

        /**
         * An easy way of determining what kind of class this is.
         *
         * @prop {String} className -  easy way of determining what kind of class this is
         */
        this.className = 'TruxCollection';

        return this;
    };

    /**
     * Inherit prototype methods from Trux.Base.
     *
     */
    Trux.Collection.prototype = Object.create(Trux.Base.prototype);

    /**
     * Requests a collection from a remote store.
     *
     * @implements qwest.get
     * @param {Object} options - optional options containing possible onDone and onFail methods
     * @return {Object} _this - class instance
     */
    Trux.Collection.prototype.fetch = function(options) {
        var _this = this;

        qwest.get(this.GET, null, this.requestOptions)
            .then(function (xhr, response) {
                _this.setModels(response);

                if (options && typeof options.onDone === 'function') {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                if (options && typeof options.onFail === 'function') {
                    options.onFail(xhr, response, e);
                }
            });

        return this;
    };

    /**
     * Sets the models for this collection.
     * Instantiates a Model for each data item contained with in the models param.
     * Appends these models into the data property of this Collection instance.
     *
     * @param {Array} models - an array of JSON objects, each object must have an id property
     * @return {Object} _this - class instance
     */
    Trux.Collection.prototype.setModels = function (models) {

        if(!Array.isArray(models)) return;

        this.purgeModels();

        var length = models.length;
        var i;

        for (i = 0 ; i < length ; i++) {
            var model = new this.modelConstructor(models[i]);
            this.append(model);
        }
    };

    /**
     * Appends a model to the data property of this Collection instance.
     *
     * @param {Object} model - a Model instance
     * @return void
     */
    Trux.Collection.prototype.append = function (model) {
        model.collection = this;
        this.models.push(model);
    };

    /**
     * Prepends a model to the data property of this Collection instance.
     *
     * @param {Object} model - a Model instance
     * @return void
     */
    Trux.Collection.prototype.prepend = function (model) {
        model.collection = this;
        this.models.unshift(model);
    };

    /**
     * Removes the collection's models from this instance.
     *
     * @return void
     */
    Trux.Collection.prototype.purgeModels = function () {
        this.models = [];
    };

    /**
     * Extends Trux.Collection and returns the constructor for the new class.
     *
     * @param {Object} props - custom props for the new class
     * @param {Boolean|Function} setup - an optional function to run within the new class' constructor
     * @return {Function} TruxCollection - the new constructor
     */
    Trux.Collection.extend = function (props, setup) {
        var TruxCollection = function (modelConstructor) {
            Trux.Collection.call(this, modelConstructor);

            if (typeof setup === 'function') {
                setup(this);
            }
        };

        TruxCollection.prototype = Object.create(Trux.Collection.prototype);

        if (typeof props !== 'object') return TruxCollection;

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                TruxCollection.prototype[prop] = props[prop];
            }
        }

        return TruxCollection;
    };

    /**
     * Modifies the Trux.Collection class with the passed properties.
     * This will enable all custom models to inherit the properties passed to this method.
     *
     * @param {Object} props - the props to add to the Trux.Collection class
     * @return {Object} this - class instance
     */
    Trux.Collection.modify = function (props) {
        if (typeof props !== 'object') return this;

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                Trux.Collection.prototype[prop] = props[prop];
            }
        }

        return this;
    };
}(Trux));
