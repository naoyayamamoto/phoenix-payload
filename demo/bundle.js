/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = __webpack_require__(1);
console.log(dist_1.PhoenixPayload.endPointURL());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VSN = '2.0.0';
var ref = 0;
var PhoenixPayload = (function () {
    function PhoenixPayload() {
    }
    /**
     * The fully qualifed socket url
     */
    PhoenixPayload.endPointURL = function (url, params) {
        if (url === void 0) { url = '/'; }
        if (params === void 0) { params = {}; }
        var uri = this.appendParams(this.appendParams(url, params), { vsn: VSN });
        if (uri.charAt(0) !== '/') {
            return uri;
        }
        if (uri.charAt(1) === '/') {
            return this.protocol() + ":" + uri;
        }
        return this.protocol() + "://" + location.host + uri;
    };
    /**
     * Returns the socket protocol
     */
    PhoenixPayload.protocol = function () {
        return location.protocol.match(/^https/) ? 'wss' : 'ws';
    };
    /**
     * Serialize parameter
     */
    PhoenixPayload.serialize = function (obj, parentKey) {
        var queryStr = [];
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            var paramKey = parentKey ? parentKey + "[" + key + "]" : key;
            var paramVal = obj[key];
            if (typeof paramVal === 'object') {
                queryStr.push(this.serialize(paramVal, paramKey));
            }
            else {
                queryStr.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramVal));
            }
        }
        return queryStr.join('&');
    };
    /**
     * Add query parameter
     */
    PhoenixPayload.appendParams = function (url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        var prefix = url.match(/\?/) ? '&' : '?';
        return "" + url + prefix + this.serialize(params);
    };
    return PhoenixPayload;
}());
exports.PhoenixPayload = PhoenixPayload;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map