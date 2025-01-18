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
var uploadMultipartFile = async () => {
    return await createPresignedURL("some-id")
}
var createPresignedURL = async (id) => {
    var s3 = getAWSConnection();
    const signedUrlExpireSeconds = 60 * 5;
console.log(process.env.AWS_BUCKET);
    var params = {
        Bucket: process.env.AWS_BUCKET,
        Key: id,
        Expires: signedUrlExpireSeconds
    }
    var signedUrl = await s3.getSignedUrlPromise('getObject', params);
    return signedUrl;
}

module.exports = { getAllS3Buckets, uploadMultipartFile }