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
}
