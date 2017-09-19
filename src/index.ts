const VSN = '2.0.0';

const CHANNEL_EVENTS = {
    close: 'phx_close',
    error: 'phx_error',
    join: 'phx_join',
    reply: 'phx_reply',
    leave: 'phx_leave'
};

export interface Payload<T> {
    topic: string;
    event: string;
    payload: T;
    ref: number;
    join_ref: number;
}

export class PhoenixPayload {

    private ref: { [key: string]: {
        ref: number;
        join_ref: number;
    }} = {};

    /**
     * The fully qualifed socket url
     */
    public static endPointURL(url: string = '/', params: {[key: string]: string | number} = {}): string {
        const uri = this.appendParams(
            this.appendParams(url, params), { vsn: VSN });
        if (uri.charAt(0) !== '/') { return uri; }
        if (uri.charAt(1) === '/') { return `${this.protocol()}:${uri}`; }

        return `${this.protocol()}://${location.host}${uri}`;
    }

    /**
     * Returns the socket protocol
     */
    private static protocol(): string {
        return location.protocol.match(/^https/) ? 'wss' : 'ws';
    }

    /**
     * Serialize parameter
     */
    private static serialize(obj: any, parentKey?: any): string {
        const queryStr = [];
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) { continue; }
            const paramKey = parentKey ? `${parentKey}[${key}]` : key;
            const paramVal = obj[key];
            if (typeof paramVal === 'object') {
                queryStr.push(this.serialize(paramVal, paramKey));
            } else {
                queryStr.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramVal));
            }
        }
        return queryStr.join('&');
    }

    /**
     * Add query parameter
     */
    private static appendParams(url: string, params: {[key: string]: string | number} = {}): string {
        if (Object.keys(params).length === 0) { return url; }

        const prefix = url.match(/\?/) ? '&' : '?';
        return `${url}${prefix}${this.serialize(params)}`;
    }

    /**
     * Join Payload
     * @param  {string} topic
     * @param  {any}    chanParams
     * @return {string}
     */
    public joinPayload(topic: string, chanParams: {[key: string]: any} = {}): string {
        this.ref[topic] = {
            ref: 1,
            join_ref: 1
        };
        const param: Payload<{[key: string]: any}> = {
            topic: topic,
            event: CHANNEL_EVENTS.join,
            payload: chanParams,
            ref: this.ref[topic].ref,
            join_ref: this.ref[topic].join_ref
        };
        return this.encode(param);
    }

    private encode(msg: Payload<any>) {
        const payload = [
            msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload
        ];
        return JSON.stringify(payload);
    }

    /**
     * Push Payload
     * @param  {string} topic
     * @param  {string} event
     * @param  {any}    payload
     * @return {string}
     */
    public pushPayload(topic: string, event: string, payload: {[key: string]: any} = {}): string {
        if (this.ref[topic]) {
            throw Error(`tried to push '${event}' to '${topic}' before joining. Send joinPayload before pushing events`);
        }
        const param: Payload<{[key: string]: any}> = {
            topic: topic,
            event: event,
            payload: payload,
            ref: this.ref[topic].ref + 1,
            join_ref: this.ref[topic].join_ref
        };
        return this.encode(param);
    }
}


// this.channel.socket.push({
//     topic: this.channel.topic,
//     event: this.event,
//     payload: this.payload,
//     ref: this.ref,
//     join_ref: this.channel.joinRef()
// });
//
// const { topic, event, payload, ref, join_ref } = data;
// const callback = () => {
//     this.encode(data, result => {
//         this.conn.send(result);
//     });
// };
