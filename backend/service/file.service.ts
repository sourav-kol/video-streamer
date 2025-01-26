import { startMultipartUpload, completeUpload, uploadFilePart } from '../aws/aws-operations';
import { completeUploadRequest } from '.././types/aws';

const startFileUpload = async (key: string, fileType: string): Promise<string> => {
    var uploadId = await startMultipartUpload(key, fileType);
    return uploadId;
}

const uploadPart = async (key: string, partNumber: number, fileType: string, uploadId: string, chunkBase64: string): Promise<completeUploadRequest> => {
    var chunkBlob = Buffer.from(chunkBase64, "base64");
    //var chunkBlob = new Blob([atob(chunkBase64)], { type: "application/octet-stream" });
    var result = await uploadFilePart(key, partNumber, fileType, uploadId, chunkBlob);
    return result;
}


const completeMultipartUpload = async (key: string, uploadId: string, parts: any) => {
    var result = await completeUpload(key, uploadId, parts);
}

export { startFileUpload, uploadPart, completeMultipartUpload }
