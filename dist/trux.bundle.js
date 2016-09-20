!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.qwest=e()}}(function(){var e;return function t(e,n,r){function o(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var f=new Error("Cannot find module '"+s+"'");throw f.code="MODULE_NOT_FOUND",f}var c=n[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return o(n?n:t)},c,c.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,n,r){!function(t){"use strict";var r=function(e){var t=function(e,t,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)},n=function(e,r,o){var i,s,a;if("[object Array]"===Object.prototype.toString.call(r))for(i=0,s=r.length;s>i;i++)n(e+"["+("object"==typeof r[i]?i:"")+"]",r[i],o);else if(r&&"[object Object]"===r.toString())for(a in r)r.hasOwnProperty(a)&&(e?n(e+"["+a+"]",r[a],o,t):n(a,r[a],o,t));else if(e)t(o,e,r);else for(a in r)t(o,a,r[a]);return o};return n("",e,[]).join("&").replace(/%20/g,"+")};"object"==typeof n&&"object"==typeof n.exports?n.exports=r:"function"==typeof e&&e.amd?e([],function(){return r}):t.param=r}(this)},{}],2:[function(e,t,n){!function(e){function t(e){return"function"==typeof e}function n(e){return"object"==typeof e}function r(e){"undefined"!=typeof setImmediate?setImmediate(e):"undefined"!=typeof process&&process.nextTick?process.nextTick(e):setTimeout(e,0)}var o;e[0][e[1]]=function i(e){var s,a=[],u=[],f=function(e,t){return null==s&&null!=e&&(s=e,a=t,u.length&&r(function(){for(var e=0;e<u.length;e++)u[e]()})),s};return f.then=function(f,c){var p=i(e),l=function(){function e(r){var i,s=0;try{if(r&&(n(r)||t(r))&&t(i=r.then)){if(r===p)throw new TypeError;i.call(r,function(){s++||e.apply(o,arguments)},function(e){s++||p(!1,[e])})}else p(!0,arguments)}catch(a){s++||p(!1,[a])}}try{var r=s?f:c;t(r)?e(r.apply(o,a||[])):p(s,a)}catch(i){p(!1,[i])}};return null!=s?r(l):u.push(l),p},e&&(f=e(f)),f}}("undefined"==typeof t?[window,"pinkySwear"]:[t,"exports"])},{}],qwest:[function(e,t,n){t.exports=function(){var t="undefined"!=typeof window?window:self,n=e("pinkyswear"),r=e("jquery-param"),o={},i="json",s="post",a=null,u=0,f=[],c=t.XMLHttpRequest?function(){return new t.XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")},p=""===c().responseType,l=function(e,l,d,h,y){e=e.toUpperCase(),d=d||null,h=h||{};for(var m in o)if(!(m in h))if("object"==typeof o[m]&&"object"==typeof h[m])for(var v in o[m])h[m][v]=o[m][v];else h[m]=o[m];var T,w,g,x,b,L=!1,O=!1,E=!1,j=0,q={},C={text:"*/*",xml:"text/xml",json:"application/json",post:"application/x-www-form-urlencoded",document:"text/html"},R={text:"*/*",xml:"application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",json:"application/json; q=1.0, text/*; q=0.8, */*; q=0.1"},D=!1,M=n(function(n){return n.abort=function(){E||(w&&4!=w.readyState&&w.abort(),D&&(--u,D=!1),E=!0)},n.send=function(){if(!D){if(u==a)return void f.push(n);if(E)return void(f.length&&f.shift().send());if(++u,D=!0,w=c(),T&&("withCredentials"in w||!t.XDomainRequest||(w=new XDomainRequest,O=!0,"GET"!=e&&"POST"!=e&&(e="POST"))),O?w.open(e,l):(w.open(e,l,h.async,h.user,h.password),p&&h.async&&(w.withCredentials=h.withCredentials)),!O)for(var r in q)q[r]&&w.setRequestHeader(r,q[r]);if(p&&"auto"!=h.responseType)try{w.responseType=h.responseType,L=w.responseType==h.responseType}catch(o){}p||O?(w.onload=P,w.onerror=A,O&&(w.onprogress=function(){})):w.onreadystatechange=function(){4==w.readyState&&P()},h.async?"timeout"in w?(w.timeout=h.timeout,w.ontimeout=X):g=setTimeout(X,h.timeout):O&&(w.ontimeout=function(){}),"auto"!=h.responseType&&"overrideMimeType"in w&&w.overrideMimeType(C[h.responseType]),y&&y(w),O?setTimeout(function(){w.send("GET"!=e?d:null)},0):w.send("GET"!=e?d:null)}},n}),P=function(){var e;if(D=!1,clearTimeout(g),f.length&&f.shift().send(),!E){--u;try{if(L){if("response"in w&&null===w.response)throw"The request response is empty";b=w.response}else{if(e=h.responseType,"auto"==e)if(O)e=i;else{var n=w.getResponseHeader("Content-Type")||"";e=n.indexOf(C.json)>-1?"json":n.indexOf(C.xml)>-1?"xml":"text"}switch(e){case"json":if(w.responseText.length)try{b="JSON"in t?JSON.parse(w.responseText):new Function("return ("+w.responseText+")")()}catch(r){throw"Error while parsing JSON body : "+r}break;case"xml":try{t.DOMParser?b=(new DOMParser).parseFromString(w.responseText,"text/xml"):(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(w.responseText))}catch(r){b=void 0}if(!b||!b.documentElement||b.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:b=w.responseText}}if("status"in w&&!/^2|1223/.test(w.status))throw w.status+" ("+w.statusText+")";M(!0,[w,b])}catch(r){M(!1,[r,w,b])}}},A=function(e){E||(e="string"==typeof e?e:"Connection aborted",M.abort(),M(!1,[new Error(e),w,null]))},X=function(){E||(h.attempts&&++j==h.attempts?A("Timeout ("+l+")"):(w.abort(),D=!1,M.send()))};if(h.async=!("async"in h)||!!h.async,h.cache="cache"in h&&!!h.cache,h.dataType="dataType"in h?h.dataType.toLowerCase():s,h.responseType="responseType"in h?h.responseType.toLowerCase():"auto",h.user=h.user||"",h.password=h.password||"",h.withCredentials=!!h.withCredentials,h.timeout="timeout"in h?parseInt(h.timeout,10):3e4,h.attempts="attempts"in h?parseInt(h.attempts,10):1,x=l.match(/\/\/(.+?)\//),T=x&&!!x[1]&&x[1]!=location.host,"ArrayBuffer"in t&&d instanceof ArrayBuffer?h.dataType="arraybuffer":"Blob"in t&&d instanceof Blob?h.dataType="blob":"Document"in t&&d instanceof Document?h.dataType="document":"FormData"in t&&d instanceof FormData&&(h.dataType="formdata"),null!==d)switch(h.dataType){case"json":d=JSON.stringify(d);break;case"post":d=r(d)}if(h.headers){var S=function(e,t,n){return t+n.toUpperCase()};for(x in h.headers)q[x.replace(/(^|-)([^-])/g,S)]=h.headers[x]}return"Content-Type"in q||"GET"==e||h.dataType in C&&C[h.dataType]&&(q["Content-Type"]=C[h.dataType]),q.Accept||(q.Accept=h.responseType in R?R[h.responseType]:"*/*"),T||"X-Requested-With"in q||(q["X-Requested-With"]="XMLHttpRequest"),h.cache||"Cache-Control"in q||(q["Cache-Control"]="no-cache"),"GET"==e&&d&&"string"==typeof d&&(l+=(/\?/.test(l)?"&":"?")+d),h.async&&M.send(),M},d=function(e){var t=[],r=0,o=[];return n(function(n){var i=-1,s=function(e){return function(s,a,u,f){var c=++i;return++r,t.push(l(e,n.base+s,a,u,f).then(function(e,t){o[c]=arguments,--r||n(!0,1==o.length?o[0]:[o])},function(){n(!1,arguments)})),n}};n.get=s("GET"),n.post=s("POST"),n.put=s("PUT"),n["delete"]=s("DELETE"),n["catch"]=function(e){return n.then(null,e)},n.complete=function(e){var t=function(){e()};return n.then(t,t)},n.map=function(e,t,n,r,o){return s(e.toUpperCase()).call(this,t,n,r,o)};for(var a in e)a in n||(n[a]=e[a]);return n.send=function(){for(var e=0,r=t.length;r>e;++e)t[e].send();return n},n.abort=function(){for(var e=0,r=t.length;r>e;++e)t[e].abort();return n},n})},h={base:"",get:function(){return d(h).get.apply(this,arguments)},post:function(){return d(h).post.apply(this,arguments)},put:function(){return d(h).put.apply(this,arguments)},"delete":function(){return d(h)["delete"].apply(this,arguments)},map:function(){return d(h).map.apply(this,arguments)},xhr2:p,limit:function(e){return a=e,h},setDefaultOptions:function(e){return o=e,h},setDefaultXdrResponseType:function(e){return i=e.toLowerCase(),h},setDefaultDataType:function(e){return s=e.toLowerCase(),h},getOpenRequests:function(){return u}};return h}()},{"jquery-param":1,pinkyswear:2}]},{},[1,2])("qwest")}),function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var r=e.prototype,o=this,i=o.EventEmitter;r.getListeners=function(e){var t,n,r=this._getEvents();if(e instanceof RegExp){t={};for(n in r)r.hasOwnProperty(n)&&e.test(n)&&(t[n]=r[n])}else t=r[e]||(r[e]=[]);return t},r.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},r.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},r.addListener=function(e,n){var r,o=this.getListenersAsObject(e),i="object"==typeof n;for(r in o)o.hasOwnProperty(r)&&t(o[r],n)===-1&&o[r].push(i?n:{listener:n,once:!1});return this},r.on=n("addListener"),r.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},r.once=n("addOnceListener"),r.defineEvent=function(e){return this.getListeners(e),this},r.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},r.removeListener=function(e,n){var r,o,i=this.getListenersAsObject(e);for(o in i)i.hasOwnProperty(o)&&(r=t(i[o],n),r!==-1&&i[o].splice(r,1));return this},r.off=n("removeListener"),r.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},r.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},r.manipulateListeners=function(e,t,n){var r,o,i=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(r=n.length;r--;)i.call(this,t,n[r]);else for(r in t)t.hasOwnProperty(r)&&(o=t[r])&&("function"==typeof o?i.call(this,r,o):s.call(this,r,o));return this},r.removeEvent=function(e){var t,n=typeof e,r=this._getEvents();if("string"===n)delete r[e];else if(e instanceof RegExp)for(t in r)r.hasOwnProperty(t)&&e.test(t)&&delete r[t];else delete this._events;return this},r.removeAllListeners=n("removeEvent"),r.emitEvent=function(e,t){var n,r,o,i,s,a=this.getListenersAsObject(e);for(i in a)if(a.hasOwnProperty(i))for(n=a[i].slice(0),o=n.length;o--;)r=n[o],r.once===!0&&this.removeListener(e,r.listener),s=r.listener.apply(this,t||[]),s===this._getOnceReturnValue()&&this.removeListener(e,r.listener);return this},r.trigger=n("emitEvent"),r.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},r.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},r._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},r._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return o.EventEmitter=i,e},"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof module&&module.exports?module.exports=e:o.EventEmitter=e}.call(this);
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
     * Emits either the Model's change event or, if it belongs to a Collection, performs logic to either fetch the collection or simply update its bound components.
     *
     * @return void
     */
    Trux.Model.prototype.persist = function () {
        var collection = this.collection;

        if (collection && collection.sync === true) {
            collection.fetch({
                onDone: function () {
                    collection.emitChangeEvent();
                }
            });
        } else if (collection && collection.sync === false) {
            collection.emitChangeEvent();

        }

        this.emitChangeEvent();
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

                if (options && options.onDone) {
                    options.onDone(response);
                }
            })
            .catch(function (e, xhr, response) {
                if (options && options.onFail) {
                    options.onFail(e, xhr, response);
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

                if (options && options.onDone) {
                    options.onDone(response);
                }
            })
            .catch(function (e, xhr, response) {
                if (options && options.onFail) {
                    options.onFail(e, xhr, response);
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

                if (options && options.onDone) {
                    options.onDone(response);
                }
            })
            .catch(function (xhr, response, e) {
                _this.restoreData();
                _this.persist();

                if (options && options.onFail) {
                    options.onFail(e, xhr, response);
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
         * Determines whether to sync the collection with remote when a model within the collection is updated.
         * Defaults to false.
         *
         * @prop {Boolean} sync
         */
        this.sync = false;

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

                if (options && options.onDone) {
                    options.onDone(response);
                }
            })
            .catch(function (e, xhr, response) {
                if (options && options.onFail) {
                    options.onFail(e, xhr, response);
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
