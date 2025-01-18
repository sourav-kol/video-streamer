const { getAWSConnection } = require('./aws');

//test methot to verify connection...
var getAllS3Buckets = () => {
    var s3 = getAWSConnection();

    s3.listBuckets({}, function (err, data) {
        if (err)
            console.log("err:  ", err, err.stack); // an error occurred

        else console.log("data:  ", data.Buckets);           // successful response
    })
}

//method to upload multipart file in s3 bucket
var uploadMultipartFile = (s3) => {
    var s3 = getAWSConnection();

}

module.exports = { getAllS3Buckets, uploadMultipartFile }