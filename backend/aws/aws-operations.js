const { getAWSConnection } = require('./aws');

//test method to verify connection...
const getAllS3Buckets = async () => {
    var s3 = getAWSConnection();

    s3.listBuckets({}, function (err, data) {
        if (err)
            console.log("err:  ", err, err.stack); // an error occurred

        else console.log("data:  ", data.Buckets);           // successful response
    })
}

const startMultipartUpload = async (fileName, fileType) => {
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        ContentType: fileType,
    };

    var s3 = getAWSConnection();

    const upload = await s3.createMultipartUpload(params).promise();

    return upload.UploadId;
}

//method to upload multipart file in s3 bucket
const getMultipartSignedUrls = async (key, totalParts, fileType) => {
    var uploadId = await startMultipartUpload(key, fileType);

    if (!uploadId)
        return "No upload id generated";

    return await createPresignedURL(key, uploadId, totalParts);
}

const createPresignedURL = async (key, uploadId, totalParts) => {
    var s3 = getAWSConnection();
    const signedUrlExpireSeconds = 60 * 5;
    console.log("params: ", key, uploadId, totalParts);
    var signedUrls = [];
    for (let partNumber = 1; partNumber <= 1; partNumber++) {
        var params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
            Expires: signedUrlExpireSeconds,
            UploadId: uploadId,
            PartNumber: partNumber
        }
        var signedUrl = s3.getSignedUrl('upload-video', params);
        console.log("urls:  ", signedUrl);
        signedUrls.push(signedUrl);
    }
    return {
        urls: signedUrl,
        uploadId: uploadId
    };
}

const completeUpload = async (fileName, uploadId, parts) => {
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: parts,
        },
    };
    var s3 = getAWSConnection();
    const complete = await s3.completeMultipartUpload(params);
    return { fileUrl: complete.Location };
}

module.exports = { getAllS3Buckets, getMultipartSignedUrls, completeUpload }