import { startMultipartUpload, completeUpload, uploadFilePart } from '../aws/aws-operations';
import { completeUploadRequest } from '.././types/aws';

const startFileUpload = async (key: string, fileType: string): Promise<string> => {
    var uploadId = await startMultipartUpload(key, fileType);
    return uploadId;
}

const uploadPart = async (key: string, partNumber: number, fileType: string, uploadId: string, chunk: Blob): Promise<completeUploadRequest> => {
    var result = await uploadFilePart(key, partNumber, fileType, uploadId, chunk);
    return result;
}


const completeMultipartUpload = async (key: string, uploadId: string, parts: any) => {
    var result = await completeUpload(key, uploadId, parts);
}

export { startFileUpload, uploadPart, completeMultipartUpload }
