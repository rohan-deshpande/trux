!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.qwest=e()}}(function(){var define,module,exports;return function e(t,n,o){function r(i,a){if(!n[i]){if(!t[i]){var p="function"==typeof require&&require;if(!a&&p)return p(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[i]={exports:{}};t[i][0].call(c.exports,function(e){var n=t[i][1][e];return r(n?n:e)},c,c.exports,e,t,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,t,n){!function(e){"use strict";var n=function(e){var t=function(e,t,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)},n=function(e,o,r){var s,i,a;if("[object Array]"===Object.prototype.toString.call(o))for(s=0,i=o.length;i>s;s++)n(e+"["+("object"==typeof o[s]?s:"")+"]",o[s],r);else if(o&&"[object Object]"===o.toString())for(a in o)o.hasOwnProperty(a)&&(e?n(e+"["+a+"]",o[a],r,t):n(a,o[a],r,t));else if(e)t(r,e,o);else for(a in o)t(r,a,o[a]);return r};return n("",e,[]).join("&").replace(/%20/g,"+")};"object"==typeof t&&"object"==typeof t.exports?t.exports=n:"function"==typeof define&&define.amd?define([],function(){return n}):e.param=n}(this)},{}],2:[function(e,t,n){!function(e){function t(e){return"function"==typeof e}function n(e){return"object"==typeof e}function o(e){"undefined"!=typeof setImmediate?setImmediate(e):"undefined"!=typeof process&&process.nextTick?process.nextTick(e):setTimeout(e,0)}var r;e[0][e[1]]=function s(e){var i,a=[],p=[],u=function(e,t){return null==i&&null!=e&&(i=e,a=t,p.length&&o(function(){for(var e=0;e<p.length;e++)p[e]()})),i};return u.then=function(u,c){var f=s(e),d=function(){function e(o){var s,i=0;try{if(o&&(n(o)||t(o))&&t(s=o.then)){if(o===f)throw new TypeError;s.call(o,function(){i++||e.apply(r,arguments)},function(e){i++||f(!1,[e])})}else f(!0,arguments)}catch(a){i++||f(!1,[a])}}try{var o=i?u:c;t(o)?e(o.apply(r,a||[])):f(i,a)}catch(s){f(!1,[s])}};return null!=i?o(d):p.push(d),f},e&&(u=e(u)),u}}("undefined"==typeof t?[window,"pinkySwear"]:[t,"exports"])},{}],qwest:[function(_dereq_,module,exports){module.exports=function(){var global=window||this,pinkyswear=_dereq_("pinkyswear"),jparam=_dereq_("jquery-param"),defaultXdrResponseType="json",defaultDataType="post",limit=null,requests=0,request_stack=[],getXHR=function(){return global.XMLHttpRequest?new global.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},xhr2=""===getXHR().responseType,qwest=function(method,url,data,options,before){method=method.toUpperCase(),data=data||null,options=options||{};var nativeResponseParsing=!1,crossOrigin,xhr,xdr=!1,timeoutInterval,aborted=!1,attempts=0,headers={},mimeTypes={text:"*/*",xml:"text/xml",json:"application/json",post:"application/x-www-form-urlencoded"},accept={text:"*/*",xml:"application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",json:"application/json; q=1.0, text/*; q=0.8, */*; q=0.1"},i,j,serialized,response,sending=!1,delayed=!1,timeout_start,promise=pinkyswear(function(e){if(e["catch"]=function(t){return e.then(null,t)},e.complete=function(t){return e.then(t,t)},"pinkyswear"in options)for(i in options.pinkyswear)e[i]=options.pinkyswear[i];return e.send=function(){if(!sending){if(requests==limit)return void request_stack.push(e);if(++requests,sending=!0,timeout_start=(new Date).getTime(),xhr=getXHR(),crossOrigin&&("withCredentials"in xhr||!global.XDomainRequest||(xhr=new XDomainRequest,xdr=!0,"GET"!=method&&"POST"!=method&&(method="POST"))),xdr?xhr.open(method,url):(xhr.open(method,url,options.async,options.user,options.password),xhr2&&options.async&&(xhr.withCredentials=options.withCredentials)),!xdr)for(var t in headers)headers[t]&&xhr.setRequestHeader(t,headers[t]);if(xhr2&&"document"!=options.responseType&&"auto"!=options.responseType)try{xhr.responseType=options.responseType,nativeResponseParsing=xhr.responseType==options.responseType}catch(n){}xhr2||xdr?(xhr.onload=handleResponse,xhr.onerror=handleError):xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()},"auto"!=options.responseType&&"overrideMimeType"in xhr&&xhr.overrideMimeType(mimeTypes[options.responseType]),before&&before(xhr),xdr?(xhr.onprogress=function(){},xhr.ontimeout=function(){},xhr.onerror=function(){},setTimeout(function(){xhr.send("GET"!=method?data:null)},0)):xhr.send("GET"!=method?data:null)}},e}),handleResponse=function(){var i,responseType;if(--requests,sending=!1,(new Date).getTime()-timeout_start>=options.timeout)return void(options.attempts&&++attempts==options.attempts?promise(!1,[xhr,response,new Error("Timeout ("+url+")")]):promise.send());request_stack.length&&request_stack.shift().send();try{if(nativeResponseParsing&&"response"in xhr&&null!==xhr.response)response=xhr.response;else if("document"==options.responseType){var frame=document.createElement("iframe");frame.style.display="none",document.body.appendChild(frame),frame.contentDocument.open(),frame.contentDocument.write(xhr.response),frame.contentDocument.close(),response=frame.contentDocument,document.body.removeChild(frame)}else{if(responseType=options.responseType,"auto"==responseType)if(xdr)responseType=defaultXdrResponseType;else{var ct=xhr.getResponseHeader("Content-Type")||"";responseType=ct.indexOf(mimeTypes.json)>-1?"json":ct.indexOf(mimeTypes.xml)>-1?"xml":"text"}switch(responseType){case"json":try{response="JSON"in global?JSON.parse(xhr.responseText):eval("("+xhr.responseText+")")}catch(e){throw"Error while parsing JSON body : "+e}break;case"xml":try{global.DOMParser?response=(new DOMParser).parseFromString(xhr.responseText,"text/xml"):(response=new ActiveXObject("Microsoft.XMLDOM"),response.async="false",response.loadXML(xhr.responseText))}catch(e){response=void 0}if(!response||!response.documentElement||response.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:response=xhr.responseText}}if("status"in xhr&&!/^2|1223/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";promise(!0,[xhr,response])}catch(e){promise(!1,[xhr,response,e])}},handleError=function(e){--requests,promise(!1,[xhr,null,new Error("Connection aborted")])};switch(options.async=!("async"in options)||!!options.async,options.cache="cache"in options&&!!options.cache,options.dataType="dataType"in options?options.dataType.toLowerCase():defaultDataType,options.responseType="responseType"in options?options.responseType.toLowerCase():"auto",options.user=options.user||"",options.password=options.password||"",options.withCredentials=!!options.withCredentials,options.timeout="timeout"in options?parseInt(options.timeout,10):3e4,options.attempts="attempts"in options?parseInt(options.attempts,10):1,i=url.match(/\/\/(.+?)\//),crossOrigin=i&&!!i[1]&&i[1]!=location.host,"ArrayBuffer"in global&&data instanceof ArrayBuffer?options.dataType="arraybuffer":"Blob"in global&&data instanceof Blob?options.dataType="blob":"Document"in global&&data instanceof Document?options.dataType="document":"FormData"in global&&data instanceof FormData&&(options.dataType="formdata"),options.dataType){case"json":data=null!==data?JSON.stringify(data):data;break;case"post":data=jparam(data)}if(options.headers){var format=function(e,t,n){return t+n.toUpperCase()};for(i in options.headers)headers[i.replace(/(^|-)([^-])/g,format)]=options.headers[i]}return"Content-Type"in headers||"GET"==method||options.dataType in mimeTypes&&mimeTypes[options.dataType]&&(headers["Content-Type"]=mimeTypes[options.dataType]),headers.Accept||(headers.Accept=options.responseType in accept?accept[options.responseType]:"*/*"),crossOrigin||"X-Requested-With"in headers||(headers["X-Requested-With"]="XMLHttpRequest"),options.cache||"Cache-Control"in headers||(headers["Cache-Control"]="no-cache"),"GET"==method&&data&&"string"==typeof data&&(url+=(/\?/.test(url)?"&":"?")+data),options.async&&promise.send(),promise};return{base:"",get:function(e,t,n,o){return qwest("GET",this.base+e,t,n,o)},post:function(e,t,n,o){return qwest("POST",this.base+e,t,n,o)},put:function(e,t,n,o){return qwest("PUT",this.base+e,t,n,o)},"delete":function(e,t,n,o){return qwest("DELETE",this.base+e,t,n,o)},map:function(e,t,n,o,r){return qwest(e.toUpperCase(),this.base+t,n,o,r)},xhr2:xhr2,limit:function(e){limit=e},setDefaultXdrResponseType:function(e){defaultXdrResponseType=e.toLowerCase()},setDefaultDataType:function(e){defaultDataType=e.toLowerCase()}}}()},{"jquery-param":1,pinkyswear:2}]},{},[1,2])("qwest")}),function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var o=e.prototype,r=this,s=r.EventEmitter;o.getListeners=function(e){var t,n,o=this._getEvents();if(e instanceof RegExp){t={};for(n in o)o.hasOwnProperty(n)&&e.test(n)&&(t[n]=o[n])}else t=o[e]||(o[e]=[]);return t},o.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},o.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},o.addListener=function(e,n){var o,r=this.getListenersAsObject(e),s="object"==typeof n;for(o in r)r.hasOwnProperty(o)&&t(r[o],n)===-1&&r[o].push(s?n:{listener:n,once:!1});return this},o.on=n("addListener"),o.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},o.once=n("addOnceListener"),o.defineEvent=function(e){return this.getListeners(e),this},o.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},o.removeListener=function(e,n){var o,r,s=this.getListenersAsObject(e);for(r in s)s.hasOwnProperty(r)&&(o=t(s[r],n),o!==-1&&s[r].splice(o,1));return this},o.off=n("removeListener"),o.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},o.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},o.manipulateListeners=function(e,t,n){var o,r,s=e?this.removeListener:this.addListener,i=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(o=n.length;o--;)s.call(this,t,n[o]);else for(o in t)t.hasOwnProperty(o)&&(r=t[o])&&("function"==typeof r?s.call(this,o,r):i.call(this,o,r));return this},o.removeEvent=function(e){var t,n=typeof e,o=this._getEvents();if("string"===n)delete o[e];else if(e instanceof RegExp)for(t in o)o.hasOwnProperty(t)&&e.test(t)&&delete o[t];else delete this._events;return this},o.removeAllListeners=n("removeEvent"),o.emitEvent=function(e,t){var n,o,r,s,i,a=this.getListenersAsObject(e);for(s in a)if(a.hasOwnProperty(s))for(n=a[s].slice(0),r=n.length;r--;)o=n[r],o.once===!0&&this.removeListener(e,o.listener),i=o.listener.apply(this,t||[]),i===this._getOnceReturnValue()&&this.removeListener(e,o.listener);return this},o.trigger=n("emitEvent"),o.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},o.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},o._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},o._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=s,e},"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof module&&module.exports?module.exports=e:r.EventEmitter=e}.call(this);