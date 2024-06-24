function je(r,e){for(var o=0;o<e.length;o++){const n=e[o];if(typeof n!="string"&&!Array.isArray(n)){for(const i in n)if(i!=="default"&&!(i in r)){const a=Object.getOwnPropertyDescriptor(n,i);a&&Object.defineProperty(r,i,a.get?a:{enumerable:!0,get:()=>n[i]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function o(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=o(i);fetch(i.href,a)}})();function k(r){"@babel/helpers - typeof";return k=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(r)}function se(){return typeof XMLHttpRequest=="function"||(typeof XMLHttpRequest>"u"?"undefined":k(XMLHttpRequest))==="object"}function Ee(r){return!!r&&typeof r.then=="function"}function Te(r){return Ee(r)?r:Promise.resolve(r)}var D=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $e(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Be(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var N={exports:{}},H={exports:{}},Z;function xe(){return Z||(Z=1,function(r,e){var o=typeof globalThis<"u"&&globalThis||typeof self<"u"&&self||typeof D<"u"&&D,n=function(){function a(){this.fetch=!1,this.DOMException=o.DOMException}return a.prototype=o,new a}();(function(a){(function(f){var u=typeof a<"u"&&a||typeof self<"u"&&self||typeof u<"u"&&u,c={searchParams:"URLSearchParams"in u,iterable:"Symbol"in u&&"iterator"in Symbol,blob:"FileReader"in u&&"Blob"in u&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in u,arrayBuffer:"ArrayBuffer"in u};function v(t){return t&&DataView.prototype.isPrototypeOf(t)}if(c.arrayBuffer)var h=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],p=ArrayBuffer.isView||function(t){return t&&h.indexOf(Object.prototype.toString.call(t))>-1};function g(t){if(typeof t!="string"&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||t==="")throw new TypeError('Invalid character in header field name: "'+t+'"');return t.toLowerCase()}function w(t){return typeof t!="string"&&(t=String(t)),t}function B(t){var s={next:function(){var l=t.shift();return{done:l===void 0,value:l}}};return c.iterable&&(s[Symbol.iterator]=function(){return s}),s}function b(t){this.map={},t instanceof b?t.forEach(function(s,l){this.append(l,s)},this):Array.isArray(t)?t.forEach(function(s){this.append(s[0],s[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(s){this.append(s,t[s])},this)}b.prototype.append=function(t,s){t=g(t),s=w(s);var l=this.map[t];this.map[t]=l?l+", "+s:s},b.prototype.delete=function(t){delete this.map[g(t)]},b.prototype.get=function(t){return t=g(t),this.has(t)?this.map[t]:null},b.prototype.has=function(t){return this.map.hasOwnProperty(g(t))},b.prototype.set=function(t,s){this.map[g(t)]=w(s)},b.prototype.forEach=function(t,s){for(var l in this.map)this.map.hasOwnProperty(l)&&t.call(s,this.map[l],l,this)},b.prototype.keys=function(){var t=[];return this.forEach(function(s,l){t.push(l)}),B(t)},b.prototype.values=function(){var t=[];return this.forEach(function(s){t.push(s)}),B(t)},b.prototype.entries=function(){var t=[];return this.forEach(function(s,l){t.push([l,s])}),B(t)},c.iterable&&(b.prototype[Symbol.iterator]=b.prototype.entries);function R(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function V(t){return new Promise(function(s,l){t.onload=function(){s(t.result)},t.onerror=function(){l(t.error)}})}function me(t){var s=new FileReader,l=V(s);return s.readAsArrayBuffer(t),l}function ge(t){var s=new FileReader,l=V(s);return s.readAsText(t),l}function ve(t){for(var s=new Uint8Array(t),l=new Array(s.length),y=0;y<s.length;y++)l[y]=String.fromCharCode(s[y]);return l.join("")}function J(t){if(t.slice)return t.slice(0);var s=new Uint8Array(t.byteLength);return s.set(new Uint8Array(t)),s.buffer}function Y(){return this.bodyUsed=!1,this._initBody=function(t){this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?typeof t=="string"?this._bodyText=t:c.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:c.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:c.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():c.arrayBuffer&&c.blob&&v(t)?(this._bodyArrayBuffer=J(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):c.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||p(t))?this._bodyArrayBuffer=J(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||(typeof t=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):c.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},c.blob&&(this.blob=function(){var t=R(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var t=R(this);return t||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else return this.blob().then(me)}),this.text=function(){var t=R(this);if(t)return t;if(this._bodyBlob)return ge(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(ve(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},c.formData&&(this.formData=function(){return this.text().then(Pe)}),this.json=function(){return this.text().then(JSON.parse)},this}var we=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function Oe(t){var s=t.toUpperCase();return we.indexOf(s)>-1?s:t}function j(t,s){if(!(this instanceof j))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');s=s||{};var l=s.body;if(t instanceof j){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,s.headers||(this.headers=new b(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,!l&&t._bodyInit!=null&&(l=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=s.credentials||this.credentials||"same-origin",(s.headers||!this.headers)&&(this.headers=new b(s.headers)),this.method=Oe(s.method||this.method||"GET"),this.mode=s.mode||this.mode||null,this.signal=s.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&l)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(l),(this.method==="GET"||this.method==="HEAD")&&(s.cache==="no-store"||s.cache==="no-cache")){var y=/([?&])_=[^&]*/;if(y.test(this.url))this.url=this.url.replace(y,"$1_="+new Date().getTime());else{var m=/\?/;this.url+=(m.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}j.prototype.clone=function(){return new j(this,{body:this._bodyInit})};function Pe(t){var s=new FormData;return t.trim().split("&").forEach(function(l){if(l){var y=l.split("="),m=y.shift().replace(/\+/g," "),d=y.join("=").replace(/\+/g," ");s.append(decodeURIComponent(m),decodeURIComponent(d))}}),s}function _e(t){var s=new b,l=t.replace(/\r?\n[\t ]+/g," ");return l.split("\r").map(function(y){return y.indexOf(`
`)===0?y.substr(1,y.length):y}).forEach(function(y){var m=y.split(":"),d=m.shift().trim();if(d){var I=m.join(":").trim();s.append(d,I)}}),s}Y.call(j.prototype);function _(t,s){if(!(this instanceof _))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');s||(s={}),this.type="default",this.status=s.status===void 0?200:s.status,this.ok=this.status>=200&&this.status<300,this.statusText=s.statusText===void 0?"":""+s.statusText,this.headers=new b(s.headers),this.url=s.url||"",this._initBody(t)}Y.call(_.prototype),_.prototype.clone=function(){return new _(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new b(this.headers),url:this.url})},_.error=function(){var t=new _(null,{status:0,statusText:""});return t.type="error",t};var Ae=[301,302,303,307,308];_.redirect=function(t,s){if(Ae.indexOf(s)===-1)throw new RangeError("Invalid status code");return new _(null,{status:s,headers:{location:t}})},f.DOMException=u.DOMException;try{new f.DOMException}catch{f.DOMException=function(s,l){this.message=s,this.name=l;var y=Error(s);this.stack=y.stack},f.DOMException.prototype=Object.create(Error.prototype),f.DOMException.prototype.constructor=f.DOMException}function C(t,s){return new Promise(function(l,y){var m=new j(t,s);if(m.signal&&m.signal.aborted)return y(new f.DOMException("Aborted","AbortError"));var d=new XMLHttpRequest;function I(){d.abort()}d.onload=function(){var P={status:d.status,statusText:d.statusText,headers:_e(d.getAllResponseHeaders()||"")};P.url="responseURL"in d?d.responseURL:P.headers.get("X-Request-URL");var M="response"in d?d.response:d.responseText;setTimeout(function(){l(new _(M,P))},0)},d.onerror=function(){setTimeout(function(){y(new TypeError("Network request failed"))},0)},d.ontimeout=function(){setTimeout(function(){y(new TypeError("Network request failed"))},0)},d.onabort=function(){setTimeout(function(){y(new f.DOMException("Aborted","AbortError"))},0)};function qe(P){try{return P===""&&u.location.href?u.location.href:P}catch{return P}}d.open(m.method,qe(m.url),!0),m.credentials==="include"?d.withCredentials=!0:m.credentials==="omit"&&(d.withCredentials=!1),"responseType"in d&&(c.blob?d.responseType="blob":c.arrayBuffer&&m.headers.get("Content-Type")&&m.headers.get("Content-Type").indexOf("application/octet-stream")!==-1&&(d.responseType="arraybuffer")),s&&typeof s.headers=="object"&&!(s.headers instanceof b)?Object.getOwnPropertyNames(s.headers).forEach(function(P){d.setRequestHeader(P,w(s.headers[P]))}):m.headers.forEach(function(P,M){d.setRequestHeader(M,P)}),m.signal&&(m.signal.addEventListener("abort",I),d.onreadystatechange=function(){d.readyState===4&&m.signal.removeEventListener("abort",I)}),d.send(typeof m._bodyInit>"u"?null:m._bodyInit)})}return C.polyfill=!0,u.fetch||(u.fetch=C,u.Headers=b,u.Request=j,u.Response=_),f.Headers=b,f.Request=j,f.Response=_,f.fetch=C,f})({})})(n),n.fetch.ponyfill=!0,delete n.fetch.polyfill;var i=o.fetch?o:n;e=i.fetch,e.default=i.fetch,e.fetch=i.fetch,e.Headers=i.Headers,e.Request=i.Request,e.Response=i.Response,r.exports=e}(H,H.exports)),H.exports}(function(r,e){var o;if(typeof fetch=="function"&&(typeof D<"u"&&D.fetch?o=D.fetch:typeof window<"u"&&window.fetch?o=window.fetch:o=fetch),typeof Be<"u"&&typeof window>"u"){var n=o||xe();n.default&&(n=n.default),e.default=n,r.exports=e.default}})(N,N.exports);var ae=N.exports;const fe=$e(ae),ee=je({__proto__:null,default:fe},[ae]);function te(r,e){var o=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),o.push.apply(o,n)}return o}function re(r){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?te(Object(o),!0).forEach(function(n){Se(r,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):te(Object(o)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(o,n))})}return r}function Se(r,e,o){return e=Re(e),e in r?Object.defineProperty(r,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[e]=o,r}function Re(r){var e=De(r,"string");return T(e)=="symbol"?e:e+""}function De(r,e){if(T(r)!="object"||!r)return r;var o=r[Symbol.toPrimitive];if(o!==void 0){var n=o.call(r,e||"default");if(T(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function T(r){"@babel/helpers - typeof";return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(r)}var A;typeof fetch=="function"&&(typeof global<"u"&&global.fetch?A=global.fetch:typeof window<"u"&&window.fetch?A=window.fetch:A=fetch);var L;se()&&(typeof global<"u"&&global.XMLHttpRequest?L=global.XMLHttpRequest:typeof window<"u"&&window.XMLHttpRequest&&(L=window.XMLHttpRequest));var U;typeof ActiveXObject=="function"&&(typeof global<"u"&&global.ActiveXObject?U=global.ActiveXObject:typeof window<"u"&&window.ActiveXObject&&(U=window.ActiveXObject));!A&&ee&&!L&&!U&&(A=fe||ee);typeof A!="function"&&(A=void 0);var Q=function(e,o){if(o&&T(o)==="object"){var n="";for(var i in o)n+="&"+encodeURIComponent(i)+"="+encodeURIComponent(o[i]);if(!n)return e;e=e+(e.indexOf("?")!==-1?"&":"?")+n.slice(1)}return e},ne=function(e,o,n,i){var a=function(c){if(!c.ok)return n(c.statusText||"Error",{status:c.status});c.text().then(function(v){n(null,{status:c.status,data:v})}).catch(n)};if(i){var f=i(e,o);if(f instanceof Promise){f.then(a).catch(n);return}}typeof fetch=="function"?fetch(e,o).then(a).catch(n):A(e,o).then(a).catch(n)},oe=!1,Le=function(e,o,n,i){e.queryStringParams&&(o=Q(o,e.queryStringParams));var a=re({},typeof e.customHeaders=="function"?e.customHeaders():e.customHeaders);typeof window>"u"&&typeof global<"u"&&typeof global.process<"u"&&global.process.versions&&global.process.versions.node&&(a["User-Agent"]="i18next-http-backend (node/".concat(global.process.version,"; ").concat(global.process.platform," ").concat(global.process.arch,")")),n&&(a["Content-Type"]="application/json");var f=typeof e.requestOptions=="function"?e.requestOptions(n):e.requestOptions,u=re({method:n?"POST":"GET",body:n?e.stringify(n):void 0,headers:a},oe?{}:f),c=typeof e.alternateFetch=="function"&&e.alternateFetch.length>=1?e.alternateFetch:void 0;try{ne(o,u,i,c)}catch(v){if(!f||Object.keys(f).length===0||!v.message||v.message.indexOf("not implemented")<0)return i(v);try{Object.keys(f).forEach(function(h){delete u[h]}),ne(o,u,i,c),oe=!0}catch(h){i(h)}}},Ie=function(e,o,n,i){n&&T(n)==="object"&&(n=Q("",n).slice(1)),e.queryStringParams&&(o=Q(o,e.queryStringParams));try{var a;L?a=new L:a=new U("MSXML2.XMLHTTP.3.0"),a.open(n?"POST":"GET",o,1),e.crossDomain||a.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.withCredentials=!!e.withCredentials,n&&a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.overrideMimeType&&a.overrideMimeType("application/json");var f=e.customHeaders;if(f=typeof f=="function"?f():f,f)for(var u in f)a.setRequestHeader(u,f[u]);a.onreadystatechange=function(){a.readyState>3&&i(a.status>=400?a.statusText:null,{status:a.status,data:a.responseText})},a.send(n)}catch(c){console&&console.log(c)}},Me=function(e,o,n,i){if(typeof n=="function"&&(i=n,n=void 0),i=i||function(){},A&&o.indexOf("file:")!==0)return Le(e,o,n,i);if(se()||typeof ActiveXObject=="function")return Ie(e,o,n,i);i(new Error("No fetch and no xhr implementation found!"))};function S(r){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(r)}function ie(r,e){var o=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),o.push.apply(o,n)}return o}function X(r){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?ie(Object(o),!0).forEach(function(n){ue(r,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ie(Object(o)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(o,n))})}return r}function He(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Ue(r,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,ce(n.key),n)}}function ze(r,e,o){return e&&Ue(r.prototype,e),Object.defineProperty(r,"prototype",{writable:!1}),r}function ue(r,e,o){return e=ce(e),e in r?Object.defineProperty(r,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[e]=o,r}function ce(r){var e=Fe(r,"string");return S(e)=="symbol"?e:e+""}function Fe(r,e){if(S(r)!="object"||!r)return r;var o=r[Symbol.toPrimitive];if(o!==void 0){var n=o.call(r,e||"default");if(S(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}var Ce=function(){return{loadPath:"/locales/{{lng}}/{{ns}}.json",addPath:"/locales/add/{{lng}}/{{ns}}",parse:function(o){return JSON.parse(o)},stringify:JSON.stringify,parsePayload:function(o,n,i){return ue({},n,i||"")},parseLoadPayload:function(o,n){},request:Me,reloadInterval:typeof window<"u"?!1:60*60*1e3,customHeaders:{},queryStringParams:{},crossDomain:!1,withCredentials:!1,overrideMimeType:!1,requestOptions:{mode:"cors",credentials:"same-origin",cache:"default"}}},le=function(){function r(e){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};He(this,r),this.services=e,this.options=o,this.allOptions=n,this.type="backend",this.init(e,o,n)}return ze(r,[{key:"init",value:function(o){var n=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(this.services=o,this.options=X(X(X({},Ce()),this.options||{}),i),this.allOptions=a,this.services&&this.options.reloadInterval){var f=setInterval(function(){return n.reload()},this.options.reloadInterval);S(f)==="object"&&typeof f.unref=="function"&&f.unref()}}},{key:"readMulti",value:function(o,n,i){this._readAny(o,o,n,n,i)}},{key:"read",value:function(o,n,i){this._readAny([o],o,[n],n,i)}},{key:"_readAny",value:function(o,n,i,a,f){var u=this,c=this.options.loadPath;typeof this.options.loadPath=="function"&&(c=this.options.loadPath(o,i)),c=Te(c),c.then(function(v){if(!v)return f(null,{});var h=u.services.interpolator.interpolate(v,{lng:o.join("+"),ns:i.join("+")});u.loadUrl(h,f,n,a)})}},{key:"loadUrl",value:function(o,n,i,a){var f=this,u=typeof i=="string"?[i]:i,c=typeof a=="string"?[a]:a,v=this.options.parseLoadPayload(u,c);this.options.request(this.options,o,v,function(h,p){if(p&&(p.status>=500&&p.status<600||!p.status))return n("failed loading "+o+"; status code: "+p.status,!0);if(p&&p.status>=400&&p.status<500)return n("failed loading "+o+"; status code: "+p.status,!1);if(!p&&h&&h.message&&h.message.indexOf("Failed to fetch")>-1)return n("failed loading "+o+": "+h.message,!0);if(h)return n(h,!1);var g,w;try{typeof p.data=="string"?g=f.options.parse(p.data,i,a):g=p.data}catch{w="failed parsing "+o+" to json"}if(w)return n(w,!1);n(null,g)})}},{key:"create",value:function(o,n,i,a,f){var u=this;if(this.options.addPath){typeof o=="string"&&(o=[o]);var c=this.options.parsePayload(n,i,a),v=0,h=[],p=[];o.forEach(function(g){var w=u.options.addPath;typeof u.options.addPath=="function"&&(w=u.options.addPath(g,n));var B=u.services.interpolator.interpolate(w,{lng:g,ns:n});u.options.request(u.options,B,c,function(b,R){v+=1,h.push(b),p.push(R),v===o.length&&typeof f=="function"&&f(h,p)})})}}},{key:"reload",value:function(){var o=this,n=this.services,i=n.backendConnector,a=n.languageUtils,f=n.logger,u=i.language;if(!(u&&u.toLowerCase()==="cimode")){var c=[],v=function(p){var g=a.toResolveHierarchy(p);g.forEach(function(w){c.indexOf(w)<0&&c.push(w)})};v(u),this.allOptions.preload&&this.allOptions.preload.forEach(function(h){return v(h)}),c.forEach(function(h){o.allOptions.ns.forEach(function(p){i.read(h,p,"read",null,null,function(g,w){g&&f.warn("loading namespace ".concat(p," for language ").concat(h," failed"),g),!g&&w&&f.log("loaded namespace ".concat(p," for language ").concat(h),w),i.loaded("".concat(h,"|").concat(p),g,w)})})})}}}])}();le.type="backend";function Xe(r,e,o){let n=r.volume;const i=(n-e)/(o/10),a=setInterval(()=>{n>e?(n-=i,r.volume=Math.max(n,e)):clearInterval(a)},10)}function ke(r,e,o){let n=r.volume;r.play();const i=(e-n)/(o/10),a=setInterval(()=>{n<e?(n+=i,r.volume=Math.min(n,e)):clearInterval(a)},10)}const E={video:!1,mainAudio:!1,carAudio:!0,language:!1};let O=0,x=0,F=new Set;const z=[{start:12,end:15},{start:30,end:34},{start:45,end:49},{start:60,end:64},{start:75,end:79},{start:92,end:96},{start:112,end:116},{start:137,end:141},{start:162,end:165},{start:180,end:184},{start:205,end:209},{start:238,end:245}];function Ne(){i18next.use(le).init({lng:"en",fallbackLng:"en",backend:{loadPath:"https://cdn.jsdelivr.net/gh/yndmitry/inDrive@master/public/locales/{{lng}}.json"}},(r,e)=>{if(r){console.error("i18next init error:",r);return}he(),E.language=!0,de()})}function de(){E.video&&E.mainAudio&&E.carAudio&&E.language&&$(".preloader").fadeOut(200,()=>{$(".main-screen").fadeIn(200)})}function he(){const r=i18next.language,e=["ar","ur"].includes(r);document.body.classList.toggle("rtl",e),$("#intro").text(i18next.t("intro.text")),$("#start").text(i18next.t("intro.button")),$("#restart-btn").text(i18next.t("main.tryAgainButton")),$("#quiz-next-btn").text(i18next.t("main.nextButton")),$("#global-result").is(":visible")&&G(),$(".quiz_result").is(":visible")&&be(),$("#quiz").is(":visible")&&(F.has(O)?K(O):ye(O))}function pe(){$("#main-clip").show(),$("#main-video").get(0).play(),$("#main-audio").get(0).play(),$("#car-audio").get(0).play()}function Qe(r){const e=document.getElementById(`clip-${r}`);e&&($(e).fadeIn(200).prop("autoplay",!0).get(0).play(),Xe(W,.2,200))}function Ge(r){const e=document.getElementById(`clip-${r}`);e&&($(e).fadeOut(200).prop("autoplay",!1).get(0).pause(),ke(W,1,200))}function ye(r){const e=i18next.t("questions",{returnObjects:!0});if(r>=e.length){G();return}const o=e[r];if(!o||!o.options){console.error(`Question or options not found for index: ${r}`);return}K(r);const n=o.options.map((i,a)=>`
    <button class="quiz_button">${a+1}. ${i}</button>
  `).join("");$("#quiz .quiz_body").show().html(n),$("#quiz").fadeIn(200),$(".quiz_button").off("click").on("click",function(){const i=$(this).text().replace(/^\d+\.\s*/,"");i===o.correctAnswer&&x++,F.add(r),$("#quiz .quiz_body").fadeOut(200,()=>{$(".quiz_result-message").data("feedback-key",i===o.correctAnswer?"correct":"incorrect"),$(".quiz_result-message").data("feedback-index",r),be(),$(".quiz_result").fadeIn(200),$("#quiz-next-btn").off("click").on("click",()=>{$(".quiz_result").fadeOut(200,()=>{$("#quiz").fadeOut(200,()=>{Ge(r),O++,O<z.length?(q.currentTime=z[O-1].end,q.play(),W.play(),We.play()):G()})})})})})}function K(r){const o=i18next.t("questions",{returnObjects:!0})[r];$("#quiz .quiz_message-p").text(o.text)}function be(){const r=$(".quiz_result-message").data("feedback-key"),e=$(".quiz_result-message").data("feedback-index");if(r){const o=i18next.t("questions",{returnObjects:!0}),n=i18next.t(o[e].feedback[r]);$(".quiz_result-message").text(n)}}function G(){$("#quiz").hide();const r=i18next.t("questions",{returnObjects:!0}).length;let e="",o="";x>=9?(e=i18next.t("results.9-11"),o="https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7db61f47f75879d25c_9-11.webp"):x>=6?(e=i18next.t("results.6-8"),o="https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7e84abff9cd9e4b9e6_6-8.webp"):x>=2?(e=i18next.t("results.2-5"),o="https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7de087682c0094fe9e_2-5.webp"):(e=i18next.t("results.0-1"),o="https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7d859c2b8102452b2f_0-1.webp"),$("#global-result").show(),$("#global-result .quiz_message-p").text(`${x}/${r}: ${e}`),$("#result-sticker").attr("src",o),$("#restart-btn").off("click").on("click",Ke)}function Ke(){O=0,x=0,F.clear(),$("#global-result").hide(),$("#clip-11").hide().get(0).pause(),$("#quiz").fadeOut(200),q.pause(),q.currentTime=5,pe()}$(document).ready(function(){Ne(),$("#main-video").on("loadeddata",function(){E.video=!0}),$("#main-audio").on("loadeddata",function(){E.mainAudio=!0}),$("#main-video").get(0).load(),$("#main-audio").get(0).load(),$("#car-audio").get(0).load();const r=$("#main-video").get(0),e=$("#main-audio").get(0),o=$("#car-audio").get(0),n=a=>{let f=0;for(let u=0;u<a.buffered.length;u++)f+=a.buffered.end(u)-a.buffered.start(u);return f/a.duration},i=()=>{const a=n(r),f=n(e),u=n(o);Math.round((a+f+u)/3)===1&&de()};r.addEventListener("progress",i),e.addEventListener("progress",i),o.addEventListener("progress",i)});$("#start").click(function(){$(".main-screen").fadeOut(200,pe)});$("#toggleAudio").click(function(){const r=$("#main-audio").get(0),e=$("#car-audio").get(0);r.muted=!r.muted,e.muted=!e.muted,$("#sound-rect").toggle(r.muted)});$("[data-lng]").click(function(){const r=$(this).attr("data-lng");i18next.changeLanguage(r,function(e,o){e&&console.error("Error changing language",e),he()})});const q=document.getElementById("main-video"),W=document.getElementById("main-audio"),We=document.getElementById("car-audio");q.playbackRate=1;q.currentTime=5;q.addEventListener("timeupdate",function(){O<z.length&&q.currentTime>=z[O].start&&(q.pause(),Qe(O),F.has(O)?K(O):ye(O))});
