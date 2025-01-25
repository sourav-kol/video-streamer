export type preSignedUrlOutput = {
    urls: string[],
    uploadId: string
}

export type completeUploadRequest = {
    etag: string,
    partNumber: number
}