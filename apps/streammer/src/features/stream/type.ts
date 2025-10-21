

export interface StreamKeyResponse {
    status: string;
    message: string;
    data: {
        streamKey: string;
    }
    timestamp: string;
}
