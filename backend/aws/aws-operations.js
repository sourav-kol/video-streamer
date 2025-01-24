const { getAWSConnection } = require('./aws');

//test method to verify connection...
var getAllS3Buckets = async () => {
    var s3 = getAWSConnection();

    s3.listBuckets({}, function (err, data) {
        if (err)
            console.log("err:  ", err, err.stack); // an error occurred

        else console.log("data:  ", data.Buckets);           // successful response
    })
}

//method to upload multipart file in s3 bucket
var getMultipartSignedUrls = async (key, uploadId, totalParts, fileType) => {
    return await createPresignedURL(key, uploadId, totalParts, fileType)
}

var createPresignedURL = async (key, uploadId, totalParts, fileType) => {
    var s3 = getAWSConnection();
    const signedUrlExpireSeconds = 60 * 5;
    var signedUrls = [];
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
        var params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
            Expires: signedUrlExpireSeconds,
            UploadId: uploadId,
            PartNumber: partNumber,
            ContentType: fileType
        }
        var signedUrl = await s3.getSignedUrlPromise('upload-video', params);
        signedUrls.push(signedUrl);
    }
    return signedUrls;
}

module.exports = { getAllS3Buckets, getMultipartSignedUrls }