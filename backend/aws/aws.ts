import AWS, { S3 } from 'aws-sdk';

var getAWSConnection = (): S3 => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
    });

    return new AWS.S3();
}

export { getAWSConnection }