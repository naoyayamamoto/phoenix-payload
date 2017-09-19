export interface Payload<T> {
    topic: string;
    event: string;
    payload: T;
    ref: number;
    join_ref?: number;
}
export declare class PhoenixPayload {
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
     * Join payload
     * @param  {string} topic
     * @param  {any}    chanParams
     * @return {string}
     */
    static join(topic: string, chanParams?: {
        [key: string]: any;
    }): string;
    private static encode(msg);
    /**
     * Push payload
     * @param  {string} topic
     * @param  {string} event
     * @param  {any}    payload
     * @return {string}
     */
    static push(topic: string, event: string, payload?: {
        [key: string]: any;
    }): string;
    /**
     * Heartbeat payload
     * @return {string}
     */
    static heartbeat(): string;
}
