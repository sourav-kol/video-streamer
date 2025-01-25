import { CompleteMultipartUploadOutput, CompleteMultipartUploadRequest, CreateMultipartUploadOutput, CreateMultipartUploadRequest } from 'aws-sdk/clients/s3';
import { getAWSConnection } from './aws';
import { preSignedUrlOutput } from '.././types/aws';

//test method to verify connection...
const getAllS3Buckets = async () => {
    var s3 = getAWSConnection();

    s3.listBuckets({}, function (err, data) {
        if (err)
            console.log("err:  ", err, err.stack); // an error occurred

        else console.log("data:  ", data.Buckets);           // successful response
    })
}

const startMultipartUpload = async (fileName: string, fileType: string): Promise<string> => {
    const params: CreateMultipartUploadRequest = {
        Bucket: process.env.AWS_BUCKET || '',
        Key: fileName,
        ContentType: fileType,
    };

    var s3 = getAWSConnection();

    const upload: CreateMultipartUploadOutput = await s3.createMultipartUpload(params).promise();

    return upload.UploadId as string;
}

//method to upload multipart file in s3 bucket
const getMultipartSignedUrls = async (key: string, totalParts: number, fileType: string): Promise<preSignedUrlOutput | string> => {
    var uploadId = await startMultipartUpload(key, fileType);

    if (!uploadId)
        return "No upload id generated";

    return await createMultipartPresignedURL(key, uploadId, totalParts);
}

//todo: refactor
const createMultipartPresignedURL = async (key: string, uploadId: string, totalParts: number): Promise<preSignedUrlOutput> => {
    var s3 = getAWSConnection();
    const signedUrlExpireSeconds = 60 * 5;
    var signedUrls: string[] = [];

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
        var params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
            Expires: signedUrlExpireSeconds,
            PartNumber: partNumber,
            UploadId: uploadId
        }
        console.log("params:  ", params);
        var signedUrl = s3.getSignedUrl('uploadPart', params);
        console.log("urls:  ", signedUrl);
        signedUrls.push(signedUrl);
    }
    return {
        urls: signedUrls,
        uploadId: uploadId
    };
}

const completeUpload = async (fileName: string, uploadId: string, parts: any): Promise<boolean> => {
    const params: CompleteMultipartUploadRequest = {
        Bucket: process.env.AWS_BUCKET || "",
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: parts,
        },
    };
    var s3 = getAWSConnection();
    s3.completeMultipartUpload(params);
    return true;
}

export { getAllS3Buckets, getMultipartSignedUrls, completeUpload }