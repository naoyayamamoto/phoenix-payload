export interface Payload<T> {
    topic: string;
    event: string;
    payload: T;
    ref: number;
    join_ref: number;
}
export declare class PhoenixPayload {
    private ref;
    private joinRef;
    /**
     * The fully qualifed socket url
     */
    static endPointURL(url?: string, params?: {
        [key: string]: string | number;
    }): string;
    /**
     * Returns the socket protocol
     */
    private static protocol();
    /**
     * Serialize parameter
     */
    private static serialize(obj, parentKey?);
    /**
     * Add query parameter
     */
    private static appendParams(url, params?);
    /**
     * Join Payload
     * @param  {string} topic
     * @param  {any}    chanParams
     * @return {string}
     */
    joinPayload(topic: string, chanParams?: {
        [key: string]: any;
    }): string;
    private encode(msg);
    /**
     * Push Payload
     * @param  {string} topic
     * @param  {string} event
     * @param  {any}    payload
     * @return {string}
     */
    pushPayload(topic: string, event: string, payload?: {
        [key: string]: any;
    }): string;
}
