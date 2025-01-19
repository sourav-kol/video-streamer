const { getMultipartSignedUrls } = require('../aws/aws-operations');

const getSignedUrls = async (key, uploadId, totalParts, fileType) => {
    var url = await getMultipartSignedUrls(key, uploadId, totalParts, fileType);
    return url;
}

module.exports = { getSignedUrls }
