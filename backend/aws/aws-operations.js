const { getAWSConnection } = require('./aws');

//test methot to verify connection...
var getAllS3Buckets = async () => {
    var s3 = getAWSConnection();

    s3.listBuckets({}, function (err, data) {
        if (err)
            console.log("err:  ", err, err.stack); // an error occurred

        else console.log("data:  ", data.Buckets);           // successful response
    })
}

//method to upload multipart file in s3 bucket
var createMultipartFile = async (params) => {
    var s3 = getAWSConnection();
    const upload = await s3.createMultipartUpload(params);
    return { uploadId: upload.UploadId };
}

var uploadPart = async (fileName, partNumber, uploadId, fileChunk) => {
    var s3 = getAWSConnection();

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        PartNumber: partNumber,
        UploadId: uploadId,
        Body: Buffer.from(fileChunk, "base64"),
    };

    try {
        const uploadParts = await s3.uploadPart(params);
        return { ETag: uploadParts.ETag };
    } catch (error) {
        return null;
    }
}

var completeUpload = async (fileName, uploadId, parts) => {
    var s3 = getAWSConnection();

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: parts,
        },
    };

    try {
        const complete = await s3.completeMultipartUpload(params);
        console.log({ complete });
        return { fileUrl: complete.Location };
    } catch (error) {
        return null;
    }
}


var createPresignedURL = async (id) => {
    var s3 = getAWSConnection();
    const signedUrlExpireSeconds = 60 * 5;
    var params = {
        Bucket: process.env.AWS_BUCKET,
        Key: id,
        Expires: signedUrlExpireSeconds
    }
    var signedUrl = await s3.getSignedUrlPromise('video-upload', params);
    return signedUrl;
}

module.exports = { getAllS3Buckets, uploadMultipartFile: createMultipartFile, completeUpload, uploadPart }