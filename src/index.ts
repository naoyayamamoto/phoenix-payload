const VSN = '2.0.0';

let ref: number = 0;

export class PhoenixPayload {
    /**
     * The fully qualifed socket url
     */
    public static endPointURL(url: string, params: {[key: string]: string | number} = {}): string {
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
    private static appendParams(url: string, params?: {[key: string]: string | number}): string {
        if (Object.keys(params).length === 0) { return url; }

        const prefix = url.match(/\?/) ? '&' : '?';
        return `${url}${prefix}${this.serialize(params)}`;
    }
}
