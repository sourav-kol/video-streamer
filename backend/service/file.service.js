const { getMultipartSignedUrls } = require('../aws/aws-operations');

const getSignedUrls = async (key, totalParts, fileType) => {
    var url = await getMultipartSignedUrls(key, totalParts, fileType);
    return url;
}

module.exports = { getSignedUrls }
