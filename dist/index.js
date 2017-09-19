"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VSN = '2.0.0';
var CHANNEL_EVENTS = {
    close: 'phx_close',
    error: 'phx_error',
    join: 'phx_join',
    reply: 'phx_reply',
    leave: 'phx_leave'
};
var ref = 0;
var joinRef = {};
var PhoenixPayload = /** @class */ (function () {
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
        if (params === void 0) { params = {}; }
        if (Object.keys(params).length === 0) {
            return url;
        }
        var prefix = url.match(/\?/) ? '&' : '?';
        return "" + url + prefix + this.serialize(params);
    };
    /**
     * Join payload
     * @param  {string} topic
     * @param  {any}    chanParams
     * @return {string}
     */
    PhoenixPayload.join = function (topic, chanParams) {
        if (chanParams === void 0) { chanParams = {}; }
        joinRef[topic] = 1 + Object.keys(joinRef).length;
        var param = {
            topic: topic,
            event: CHANNEL_EVENTS.join,
            payload: chanParams,
            ref: ref++,
            join_ref: joinRef[topic]
        };
        return this.encode(param);
    };
    PhoenixPayload.encode = function (msg) {
        var payload = [
            msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload
        ];
        return JSON.stringify(payload);
    };
    /**
     * Push payload
     * @param  {string} topic
     * @param  {string} event
     * @param  {any}    payload
     * @return {string}
     */
    PhoenixPayload.push = function (topic, event, payload) {
        if (payload === void 0) { payload = {}; }
        if (!joinRef[topic]) {
            throw Error("tried to push '" + event + "' to '" + topic + "' before joining. Send joinPayload before pushing events");
        }
        var param = {
            topic: topic,
            event: event,
            payload: payload,
            ref: ref++,
            join_ref: joinRef[topic]
        };
        return this.encode(param);
    };
    /**
     * Heartbeat payload
     * @return {string}
     */
    PhoenixPayload.heartbeat = function () {
        return this.encode({
            topic: 'phoenix',
            event: 'heartbeat',
            payload: {},
            ref: ref++,
        });
    };
    return PhoenixPayload;
}());
exports.PhoenixPayload = PhoenixPayload;
//# sourceMappingURL=index.js.map