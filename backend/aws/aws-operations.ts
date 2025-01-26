import { CompleteMultipartUploadRequest, CreateBucketRequest, CreateMultipartUploadOutput, CreateMultipartUploadRequest, UploadPartRequest } from 'aws-sdk/clients/s3';
import { getAWSConnection } from './aws';
import { preSignedUrlOutput, completeUploadRequest } from '.././types/aws';

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

const uploadFilePart = async (key: string, partNumber: number, fileType: string, uploadId: string, chunk: Buffer): Promise<completeUploadRequest> => {
    var s3 = getAWSConnection();
    var params: UploadPartRequest = {
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        PartNumber: partNumber,
        UploadId: uploadId,
        Body: chunk
    }
    var uploaded = await s3.uploadPart(params).promise();
    return {
        etag: uploaded.ETag,
        partNumber: partNumber
    }
}

const completeUpload = async (fileName: string, uploadId: string, parts: completeUploadRequest[]): Promise<boolean> => {
    const params: CompleteMultipartUploadRequest = {
        Bucket: process.env.AWS_BUCKET || "",
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: parts.map((x) => {
                return { ETag: x.etag, PartNumber: x.partNumber };
            }),
        },
    };
    var s3 = getAWSConnection();
    console.log("params: ", parts);

    s3.completeMultipartUpload(params, (err, output) => {
        console.log(err, output);
    });
    return true;
}

//--- Not Used ---

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
        var signedUrl = s3.getSignedUrl('uploadPart', params);
        signedUrls.push(signedUrl);
    }
    return {
        urls: signedUrls,
        uploadId: uploadId
    };
}

//test method to verify connection...
const getAllS3Buckets = async () => {
    var s3 = getAWSConnection();

    s3.listBuckets({}, function (err, data) {
        if (err)
            console.log("err:  ", err, err.stack); // an error occurred

        else console.log("data:  ", data.Buckets);           // successful response
    })
}

export { getAllS3Buckets, getMultipartSignedUrls, completeUpload, startMultipartUpload, uploadFilePart }