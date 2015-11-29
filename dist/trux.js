!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.qwest=e()}}(function(){var define,module,exports;return function e(t,n,o){function r(i,a){if(!n[i]){if(!t[i]){var p="function"==typeof require&&require;if(!a&&p)return p(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[i]={exports:{}};t[i][0].call(c.exports,function(e){var n=t[i][1][e];return r(n?n:e)},c,c.exports,e,t,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,t,n){function o(){c=!1,a.length?u=a.concat(u):d=-1,u.length&&r()}function r(){if(!c){var e=setTimeout(o);c=!0;for(var t=u.length;t;){for(a=u,u=[];++d<t;)a&&a[d].run();d=-1,t=u.length}a=null,c=!1,clearTimeout(e)}}function s(e,t){this.fun=e,this.array=t}function i(){}var a,p=t.exports={},u=[],c=!1,d=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new s(e,t)),1!==u.length||c||setTimeout(r,0)},s.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=i,p.addListener=i,p.once=i,p.off=i,p.removeListener=i,p.removeAllListeners=i,p.emit=i,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],2:[function(e,t,n){!function(e){"use strict";var n=function(e){var t=function(e,t,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)},n=function(e,o,r){var s,i,a;if("[object Array]"===Object.prototype.toString.call(o))for(s=0,i=o.length;i>s;s++)n(e+"["+("object"==typeof o[s]?s:"")+"]",o[s],r);else if(o&&"[object Object]"===o.toString())for(a in o)o.hasOwnProperty(a)&&(e?n(e+"["+a+"]",o[a],r,t):n(a,o[a],r,t));else if(e)t(r,e,o);else for(a in o)t(r,a,o[a]);return r};return n("",e,[]).join("&").replace(/%20/g,"+")};"object"==typeof t&&"object"==typeof t.exports?t.exports=n:"function"==typeof define&&define.amd?define([],function(){return n}):e.param=n}(this)},{}],3:[function(e,t,n){(function(e){!function(t){function n(e){return"function"==typeof e}function o(e){return"object"==typeof e}function r(t){"undefined"!=typeof setImmediate?setImmediate(t):"undefined"!=typeof e&&e.nextTick?e.nextTick(t):setTimeout(t,0)}var s;t[0][t[1]]=function i(e){var t,a=[],p=[],u=function(e,n){return null==t&&null!=e&&(t=e,a=n,p.length&&r(function(){for(var e=0;e<p.length;e++)p[e]()})),t};return u.then=function(u,c){var d=i(e),f=function(){function e(t){var r,i=0;try{if(t&&(o(t)||n(t))&&n(r=t.then)){if(t===d)throw new TypeError;r.call(t,function(){i++||e.apply(s,arguments)},function(e){i++||d(!1,[e])})}else d(!0,arguments)}catch(a){i++||d(!1,[a])}}try{var r=t?u:c;n(r)?e(r.apply(s,a||[])):d(t,a)}catch(i){d(!1,[i])}};return null!=t?r(f):p.push(f),d},e&&(u=e(u)),u}}("undefined"==typeof t?[window,"pinkySwear"]:[t,"exports"])}).call(this,e("_process"))},{_process:1}],qwest:[function(_dereq_,module,exports){module.exports=function(){var global=window||this,pinkyswear=_dereq_("pinkyswear"),jparam=_dereq_("jquery-param"),defaultXdrResponseType="json",defaultDataType="post",limit=null,requests=0,request_stack=[],getXHR=function(){return global.XMLHttpRequest?new global.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},xhr2=""===getXHR().responseType,qwest=function(method,url,data,options,before){method=method.toUpperCase(),data=data||null,options=options||{};var nativeResponseParsing=!1,crossOrigin,xhr,xdr=!1,timeoutInterval,aborted=!1,attempts=0,headers={},mimeTypes={text:"*/*",xml:"text/xml",json:"application/json",post:"application/x-www-form-urlencoded"},accept={text:"*/*",xml:"application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",json:"application/json; q=1.0, text/*; q=0.8, */*; q=0.1"},vars="",i,j,serialized,response,sending=!1,delayed=!1,timeout_start,promise=pinkyswear(function(e){if(e["catch"]=function(t){return e.then(null,t)},e.complete=function(t){return e.then(t,t)},"pinkyswear"in options)for(i in options.pinkyswear)e[i]=options.pinkyswear[i];return e.send=function(){if(!sending){if(requests==limit)return void request_stack.push(e);if(++requests,sending=!0,timeout_start=(new Date).getTime(),xhr=getXHR(),crossOrigin&&("withCredentials"in xhr||!global.XDomainRequest||(xhr=new XDomainRequest,xdr=!0,"GET"!=method&&"POST"!=method&&(method="POST"))),xdr?xhr.open(method,url):(xhr.open(method,url,options.async,options.user,options.password),xhr2&&options.async&&(xhr.withCredentials=options.withCredentials)),!xdr)for(var t in headers)headers[t]&&xhr.setRequestHeader(t,headers[t]);if(xhr2&&"document"!=options.responseType&&"auto"!=options.responseType)try{xhr.responseType=options.responseType,nativeResponseParsing=xhr.responseType==options.responseType}catch(n){}xhr2||xdr?(xhr.onload=handleResponse,xhr.onerror=handleError):xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()},"auto"!=options.responseType&&"overrideMimeType"in xhr&&xhr.overrideMimeType(mimeTypes[options.responseType]),before&&before(xhr),xdr?setTimeout(function(){xhr.send("GET"!=method?data:null)},0):xhr.send("GET"!=method?data:null)}},e}),handleResponse=function(){var i,responseType;if(--requests,sending=!1,(new Date).getTime()-timeout_start>=options.timeout)return void(options.attempts&&++attempts==options.attempts?promise(!1,[xhr,response,new Error("Timeout ("+url+")")]):promise.send());request_stack.length&&request_stack.shift().send();try{if(nativeResponseParsing&&"response"in xhr&&null!==xhr.response)response=xhr.response;else if("document"==options.responseType){var frame=document.createElement("iframe");frame.style.display="none",document.body.appendChild(frame),frame.contentDocument.open(),frame.contentDocument.write(xhr.response),frame.contentDocument.close(),response=frame.contentDocument,document.body.removeChild(frame)}else{if(responseType=options.responseType,"auto"==responseType)if(xdr)responseType=defaultXdrResponseType;else{var ct=xhr.getResponseHeader("Content-Type")||"";responseType=ct.indexOf(mimeTypes.json)>-1?"json":ct.indexOf(mimeTypes.xml)>-1?"xml":"text"}switch(responseType){case"json":try{response="JSON"in global?JSON.parse(xhr.responseText):eval("("+xhr.responseText+")")}catch(e){throw"Error while parsing JSON body : "+e}break;case"xml":try{global.DOMParser?response=(new DOMParser).parseFromString(xhr.responseText,"text/xml"):(response=new ActiveXObject("Microsoft.XMLDOM"),response.async="false",response.loadXML(xhr.responseText))}catch(e){response=void 0}if(!response||!response.documentElement||response.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:response=xhr.responseText}}if("status"in xhr&&!/^2|1223/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";promise(!0,[xhr,response])}catch(e){promise(!1,[xhr,response,e])}},handleError=function(e){--requests,promise(!1,[xhr,null,new Error("Connection aborted")])};switch(options.async="async"in options?!!options.async:!0,options.cache="cache"in options?!!options.cache:!1,options.dataType="dataType"in options?options.dataType.toLowerCase():defaultDataType,options.responseType="responseType"in options?options.responseType.toLowerCase():"auto",options.user=options.user||"",options.password=options.password||"",options.withCredentials=!!options.withCredentials,options.timeout="timeout"in options?parseInt(options.timeout,10):3e4,options.attempts="attempts"in options?parseInt(options.attempts,10):1,i=url.match(/\/\/(.+?)\//),crossOrigin=i&&(i[1]?i[1]!=location.host:!1),"ArrayBuffer"in global&&data instanceof ArrayBuffer?options.dataType="arraybuffer":"Blob"in global&&data instanceof Blob?options.dataType="blob":"Document"in global&&data instanceof Document?options.dataType="document":"FormData"in global&&data instanceof FormData&&(options.dataType="formdata"),options.dataType){case"json":data=JSON.stringify(data);break;case"post":data=jparam(data)}if(options.headers){var format=function(e,t,n){return t+n.toUpperCase()};for(i in options.headers)headers[i.replace(/(^|-)([^-])/g,format)]=options.headers[i]}return"Content-Type"in headers||"GET"==method||options.dataType in mimeTypes&&mimeTypes[options.dataType]&&(headers["Content-Type"]=mimeTypes[options.dataType]),headers.Accept||(headers.Accept=options.responseType in accept?accept[options.responseType]:"*/*"),crossOrigin||"X-Requested-With"in headers||(headers["X-Requested-With"]="XMLHttpRequest"),options.cache||"Cache-Control"in headers||(headers["Cache-Control"]="no-cache"),"GET"==method&&data&&(vars+=data),vars&&(url+=(/\?/.test(url)?"&":"?")+vars),options.async&&promise.send(),promise};return{base:"",get:function(e,t,n,o){return qwest("GET",this.base+e,t,n,o)},post:function(e,t,n,o){return qwest("POST",this.base+e,t,n,o)},put:function(e,t,n,o){return qwest("PUT",this.base+e,t,n,o)},"delete":function(e,t,n,o){return qwest("DELETE",this.base+e,t,n,o)},map:function(e,t,n,o,r){return qwest(e.toUpperCase(),this.base+t,n,o,r)},xhr2:xhr2,limit:function(e){limit=e},setDefaultXdrResponseType:function(e){defaultXdrResponseType=e.toLowerCase()},setDefaultDataType:function(e){defaultDataType=e.toLowerCase()}}}()},{"jquery-param":2,pinkyswear:3}]},{},[2,3])("qwest")});
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
(function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(t,u){var n,e,r,i,o,s=this.getListenersAsObject(t);for(i in s)if(s.hasOwnProperty(i))for(n=s[i].slice(0),r=n.length;r--;)e=n[r],e.once===!0&&this.removeListener(t,e.listener),o=e.listener.apply(this,u||[]),o===this._getOnceReturnValue()&&this.removeListener(t,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);
var Trux = function () {
    var _this = this;
    var proto = this.prototype;
    var ls = localStorage;

    this.components = {};
    this.emitter = new EventEmitter();
    this.GET = false;
    this.POST = false;
    this.PUT = false;
    this.PATCH = false;
    this.DELETE = false;

    this.emitter.addListener('change', broadcast);

    function broadcast() {
        if (!Object.keys(_this.components).length) return;

        for (var prop in _this.components) {
            if(_this.components.hasOwnProperty(prop)) {
                _this.components[prop].appDataDidChange();
            }
        }
    }

    proto.bindComponent = function (component) {
        _this.components[component.componentId] = component;
    };

    proto.unbindComponent = function (component) {
        if (typeof _this.components[component.componentId] === 'undefined') return;

        delete _this.components[component.componentId];
    };

    proto.emitChangeEvent = function () {
        _this.emitter.emitEvent('change');
    };
};

var TruxCollection = function (name, modelClass) {
    Trux.call(this);
    this.prototype = Trux;
    
    this.collectionName = name;
    this.modelClass = modelClass;
    this.models = [];

    this.setModels = function (models) {
        if(!Array.isArray(models)) return;

        _this.purge();

        var length = models.length;
        var i;

        for (i = 0 ; i < length ; i++) {
            var model = new _this.modelClass(models[i]);
            _this.append(model);
        }

        return _this;
    };

    this.append = function (model) {
        model.collection = this;
        _this.models.push(model);
    };

    this.prepend = function (model) {
        model.collection = _this;
        _this.models.unshift(model);
    };

    this.cacheModels = function () {
        ls.setItem(_this.collectionName, JSON.stringify(_this.models));
    };

    this.purgeModels = function () {
        this.models = [];
        ls.removeItem(_this.collectionName);
    };
};

var TruxModel = function (name) {
    Trux.call(this);
    this.prototype = Trux;

    var _backup = null;

    this.data = null;
    this.backup = null;
    this.modelName = name;
    this.collection = false;

    this.setData = function (data) {
        this.data = data;
        _backup = JSON.parse(JSON.stringify(data));
    };

    this.restoreData = function () {
        this.data = JSON.parse(JSON.stringify(_backup));
    };

    this.fetch = function (options) {
        qwest.get(this.GET)
        .then(function (xhr, response) {
            if (typeof response !== 'object') return;

            _this.setData(response);

            if (typeof options.onDone === 'function') {
                options.onDone();
            }
        })
        .catch(function (xhr, response, e) {
            if (typeof options.onFail === 'function') {
                options.onFail(xhr, response, e);
            }
        });
    };

    this.create = function (data, options) {
        qwest.post(this.POST, data)
        .then(function (xhr, response) {
            if (typeof response !== 'object') return;

            _this.setData(response);

            if (typeof options.onDone === 'function') {
                options.onDone();
            }
        })
        .catch(function (xhr, response, e) {
            if (typeof options.onFail === 'function') {
                options.onFail(xhr, response, e);
            }
        });
    };

    this.update = function (data, options) {
        qwest.put(this.PUT, data)
        .then(function (xhr, response) {
            if (typeof response !== 'object') return;

            _this.setData(response);

            if (_this.collection) {
                _this.collection.emitChangeEvent();
            } else {
                _this.emitChangeEvent();
            }

            if (typeof options.onDone === 'function') {
                options.onDone();
            }
        })
        .catch(function (xhr, response, e) {
            _this.restoreData();

            if (_this.collection) {
                _this.collection.emitChangeEvent();
            } else {
                _this.emitChangeEvent();
            }

            if (typeof options.onFail === 'function') {
                options.onFail();
            }
        });
    };

    this.cache = function () {

    };

    this.purge = function () {

    };
};
