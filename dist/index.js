!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.PowerHelper=e():t.PowerHelper=e()}(this||("undefined"!=typeof window?window:global),(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=3)}([function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.Event=void 0;var s=n(1),u=function(){function t(t,e,n){this.id=Date.now().toString()+Math.floor(1e6*Math.random()),this.state={},this.manager=t,this.channel=e,this.callback=n}return t.prototype.invoke=function(t){var e=this;this.callback(t,{id:this.id,off:function(){return e.off()},state:this.state})},t.prototype.off=function(){this.manager.off(this.channel,this.id)},t}(),c=function(t){function e(){var e=t.call(this,"Event")||this;return e.listeners=new Map,e}return o(e,t),e.prototype.getChannelListenerSize=function(t){var e=this.listeners.get(t);return e?e.length:0},e.prototype.emit=function(t,e){var n,r,o=this.listeners.get(t);if(o)try{for(var s=i(o),u=s.next();!u.done;u=s.next()){u.value.invoke(e)}}catch(t){n={error:t}}finally{try{u&&!u.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}},e.prototype.off=function(t,e){var n=t,r=this.listeners.get(n);r&&this.listeners.set(n,r.filter((function(t){return t.id!==e})))},e.prototype.on=function(t,e){var n=t,r=new u(this,n,e);return!1===this.listeners.has(n)&&this.listeners.set(n,[]),this.listeners.get(n).push(r),r},e}(s.Base);e.Event=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Base=void 0;var r=function(t){if("string"==typeof t)return t;if(t instanceof Error)return t.message;if("object"==typeof t)try{return JSON.stringify(t,null,4)}catch(t){return"Unknown Error"}return"Unknown Error"},o=function(){function t(t){this._base={name:t}}return t.prototype.$devWarn=function(t,e){console.error(new Error("PowerHelper (O_O) "+this._base.name+" => "+t+" -> "+r(e)))},t.prototype.$devError=function(t,e){throw new Error("PowerHelper (X_X) "+this._base.name+" => "+t+" -> "+r(e))},t}();e.Base=o},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Ticker=void 0;var i=function(t){function e(e,n){var r=t.call(this)||this;return r.isStop=!1,r.delta=0,r.int=setInterval((function(){return r.run()}),e),n&&!1===n.autoPlay&&r.stop(),r}return o(e,t),e.prototype.run=function(){!1===this.isStop&&(this.delta+=1,this.emit("next",{delta:this.delta}))},e.prototype.stop=function(){this.isStop=!0},e.prototype.play=function(){this.isStop=!1},e.prototype.close=function(){clearInterval(this.int)},e}(n(0).Event);e.Ticker=i},function(t,e,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(t,e,n,r){void 0===r&&(r=n),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&r(e,t,n);return o(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.PowerHelper=e.LocalStorage=e.Schedule=e.Ticker=e.Timer=e.Cache=e.Event=e.Log=e.detect=e.array=e.json=e.flow=void 0,n(4),n(5),n(6);var s=i(n(7)),u=i(n(8)),c=i(n(9)),a=i(n(10)),l=n(11),f=n(0),p=n(12),h=n(13),y=n(2),d=n(14),v=n(15);e.flow=s,e.json=u,e.array=c,e.detect=a,e.Log=l.Log,e.Event=f.Event,e.Cache=p.Cache,e.Timer=h.Timer,e.Ticker=y.Ticker,e.Schedule=d.Schedule,e.LocalStorage=v.LocalStorage,e.PowerHelper={flow:e.flow,json:e.json,array:e.array,detect:e.detect,Log:e.Log,Event:e.Event,Cache:e.Cache,Timer:e.Timer,Ticker:e.Ticker,Schedule:e.Schedule,LocalStorage:e.LocalStorage},t.exports=e.PowerHelper,t.exports.PowerHelper=e.PowerHelper,e.default=e.PowerHelper},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.randomInt=e.randomPick=e.sleep=void 0;e.sleep=function(t){return new Promise((function(e){setTimeout((function(){return e(null)}),t)}))};e.randomPick=function(t){return t[Math.floor(Math.random()*t.length)]};e.randomInt=function(t,e){return Math.floor(Math.random()*(e-t+1)+t)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.nonStrictJSONStringify=e.nonStrictJSONParse=void 0;e.nonStrictJSONParse=function(t){try{return"string"==typeof t?JSON.parse(t):t}catch(t){return{}}};e.nonStrictJSONStringify=function(t){try{return JSON.stringify(t)}catch(t){return"{}"}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.arrayGroups=void 0;e.arrayGroups=function(t,e){for(var n=[],r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.inSafari=e.inAndroid=e.inIOS=e.inMobile=e.inAppBrowser=void 0;var r=function(){return"undefined"==typeof window?null:window.navigator};e.inAppBrowser=function(){var t=r();if(null==t)return!1;var e=t.userAgent,n=t.userAgent.toLowerCase(),o=e.indexOf("Line")>-1,i=e.indexOf("FBAV")>-1,s=!!n.match(/MicroMessenger/);return!(!o&&!i&&!s)};e.inMobile=function(){return(0,e.inIOS)()||(0,e.inAndroid)()};e.inIOS=function(){var t=r();return null!=t&&/iPad|iPhone|iPod/.test(t.userAgent)};e.inAndroid=function(){var t=r();return null!=t&&t.userAgent.toLowerCase().indexOf("android")>-1};e.inSafari=function(){var t=r();if(null==t)return!1;var e=t.userAgent,n=!!e.match(/iP(ad|od|hone)/i),o=!!e.match(/Safari/i),i=!e.match(/Chrome|CriOS|OPiOS|mercury|FxiOS|Firefox/i),s=!1;n?s=!!e.match(/WebKit/i)&&o&&i:s="undefined"!=typeof window&&void 0!==window.safari||o&&i;return s}},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Log=void 0;var i=n(0),s={default:"",red:"[31m",blue:"[34m",cyan:"[36m",black:"[30m",white:"[37m",green:"[32m",yellow:"[33m"},u=function(t){function e(e,n){var r=t.call(this)||this;return r.step=0,r.isSilence=!1,r.defaultLogType="normal",r.name=e,n&&(null!=n.silence&&r.silence(n.silence),null!=n.defaultLogType&&(r.defaultLogType=n.defaultLogType)),r}return o(e,t),e.prototype.getNow=function(){return(new Date).toISOString().split(/T|\./).slice(0,2).join(" ")},e.prototype.toPrintString=function(t,e,n){return"["+t+"]["+this.name+"]["+e+"] "+this.step+": "+n},e.prototype.silence=function(t){void 0===t&&(t=!0),this.isSilence=t},e.prototype.print=function(t,e){void 0===e&&(e={}),this.step+=1;var n=this.getNow(),r=e.color||"default",o=e.logType||this.defaultLogType,i=this.toPrintString(n,o,t),u={time:n,name:this.name,step:this.step,data:t,color:r,message:i,logType:o};return this.emit("print",u),!1===this.isSilence&&("default"===r?console.log(i):"undefined"==typeof window?console.log(""+s[r]+i+"[0m"):console.log("%c "+i,"color: "+r)),u},e}(i.Event);e.Log=u},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Cache=void 0;var i=n(1),s=n(0),u=function(){function t(t,e){this.createdAt=Date.now(),this.data=Object.freeze(t),this.keepAlive=e}return t.prototype.isExpired=function(){return this.createdAt+this.keepAlive<Date.now()},t}(),c=function(t){function e(e){var n=t.call(this,"Cache")||this;return n.event=new s.Event,n.items=new Map,n.key=e.key,n.pick=e.pick,n.keepAlive=null==e.keepAlive?3e5:e.keepAlive,n}return o(e,t),e.prototype.keys=function(){return Array.from(this.items.keys())},e.prototype.clear=function(){this.items.clear()},e.prototype.remove=function(t){var e=this.key(t);this.removeByKey(e)},e.prototype.removeByKey=function(t){this.items.has(t)&&this.items.delete(t)},e.prototype.set=function(t,e){var n=this.key(t);this.setByKey(n,e)},e.prototype.setByKey=function(t,e){this.items.set(t,new u(e,this.keepAlive))},e.prototype.get=function(t){var e=this;return new Promise((function(n,r){var o=e.key(t),i=e.items.get(o);if(i&&!1===i.isExpired())return n(i.data);var s=o+"-onload";e.event.on(s,(function(t,e){e.off(),n(t)})),1===e.event.getChannelListenerSize(s)&&e.pick(t,{key:o}).then((function(t){e.event.emit(s,t),e.setByKey(o,t)})).catch(r)}))},e}(i.Base);e.Cache=c},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Timer=void 0;var i=function(t){function e(){var e=t.call(this,1,{autoPlay:!1})||this;return e.nowTime=0,e.positive=!0,e.on("next",(function(){e.positive?e.nowTime+=1:e.nowTime-=1})),e}return o(e,t),e.prototype.setPositive=function(t){return this.positive=t,this},e.prototype.getTime=function(){return this.nowTime},e.prototype.setTime=function(t){return this.nowTime=t,this},e.prototype.addTime=function(t){return this.nowTime+=t,this},e.prototype.subtractTime=function(t){return this.nowTime-=t,this},e.prototype.getHours=function(){return this.nowTime/1e3/60/60},e.prototype.getMinutes=function(){return this.nowTime/1e3/60%60},e.prototype.getSeconds=function(){return this.nowTime/1e3%60},e.prototype.getMicroseconds=function(){return this.nowTime%1e3},e.prototype.getTimeString=function(t){void 0===t&&(t="hh:mm:ss.ff");var e=Math.floor(this.getHours()).toString().padStart(2,"0"),n=Math.floor(this.getMinutes()).toString().padStart(2,"0"),r=Math.floor(this.getSeconds()).toString().padStart(2,"0"),o=Math.floor(this.getMicroseconds()/10).toString().padStart(2,"0");return t.replace("hh",e).replace("mm",n).replace("ss",r).replace("ff",o)},e}(n(2).Ticker);e.Timer=i},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.Schedule=void 0;var s=function(t){function e(){var e=t.call(this,"Schedule")||this;return e.int=setInterval((function(){return e.run()}),100),e.isStop=!1,e.lastTime=Date.now(),e.processes=[],e}return o(e,t),e.prototype.run=function(){var t,e,n=this;if(this.isStop)return null;var r=Date.now(),o=r-this.lastTime;this.lastTime=r;var s=function(t){if(t.runningTime)return"continue";t.now+=o,t.now>=t.sec&&(t.now=0,t.runningTime=Date.now(),t.executedCount+=1,t.handler().catch((function(e){return n.$devWarn(t.name,e)})).finally((function(){t.runningTime=null})))};try{for(var u=i(this.processes),c=u.next();!c.done;c=u.next()){s(c.value)}}catch(e){t={error:e}}finally{try{c&&!c.done&&(e=u.return)&&e.call(u)}finally{if(t)throw t.error}}},e.prototype.add=function(t,e,n){this.processes.find((function(e){return e.name===t}))&&this.$devError("add","Name "+t+" already exists."),this.processes.push({sec:e,now:0,name:t,executedCount:0,runningTime:null,handler:n})},e.prototype.remove=function(t){null==this.processes.find((function(e){return e.name===t}))&&this.$devError("add","Name "+t+" not found."),this.processes=this.processes.filter((function(e){return e.name!==t}))},e.prototype.info=function(){return this.processes.map((function(t){return{name:t.name,runningTime:t.runningTime,executedCount:t.executedCount}}))},e.prototype.stop=function(){this.isStop=!0},e.prototype.play=function(){this.isStop=!1},e.prototype.close=function(){clearInterval(this.int)},e}(n(1).Base);e.Schedule=s},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.LocalStorage=void 0;var s=function(t){function e(e,n){var r=t.call(this,"LocalStorage")||this;if(r.interceptGet=null,r.interceptSet=null,r.storage="undefined"==typeof window?null:window.localStorage,r.namespaces=e,n&&(n.storageSystem&&(r.storage=n.storageSystem),n.intercept&&(n.intercept.get&&(r.interceptGet=n.intercept.get.bind(r)),n.intercept.set&&(r.interceptSet=n.intercept.set.bind(r))),n.dafaultColumns))for(var o in n.dafaultColumns)null==r.get(o)&&r.set(o,n.dafaultColumns[o]);return r}return o(e,t),e.prototype._genName=function(t){return"_power_"+this.namespaces+"/"+t.toString()},e.prototype.set=function(t,e){if(this.storage){if(this.interceptSet)e=this.interceptSet(t,e);this.storage.setItem(this._genName(t),JSON.stringify(e))}},e.prototype.get=function(t){if(this.storage){var e=this.storage.getItem(this._genName(t));if(null!=e){var n=JSON.parse(e);return this.interceptGet&&(n=this.interceptGet(t,n)),n}}},e.prototype.clear=function(){var t,e;if(this.storage){var n="_power_"+this.namespaces+"/",r=Object.keys(this.storage);try{for(var o=i(r),s=o.next();!s.done;s=o.next()){var u=s.value;u.length>=n.length&&u.slice(0,n.length)===n&&this.remove(u.slice(n.length))}}catch(e){t={error:e}}finally{try{s&&!s.done&&(e=o.return)&&e.call(o)}finally{if(t)throw t.error}}}},e.prototype.remove=function(t){this.storage&&this.storage.removeItem(this._genName(t))},e}(n(1).Base);e.LocalStorage=s}])}));