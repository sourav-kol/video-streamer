import { getMultipartSignedUrls, completeUpload } from '../aws/aws-operations';
import { preSignedUrlOutput } from '.././types/aws';

const getSignedUrls = async (key: string, totalParts: number, fileType: string): Promise<preSignedUrlOutput | string> => {
    var url = await getMultipartSignedUrls(key, totalParts, fileType);
    return url;
}

const completeMultipartUpload = async (key: string, uplaodId: string, parts: any) => {
    var result = await completeUpload(key, uplaodId, parts);
}

export { getSignedUrls, completeMultipartUpload }
