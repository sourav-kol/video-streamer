var { getSignedUrls } = require('.././service/file.service');

const getMultipartSignedUrls = async () => {
    return await getSignedUrls();
}

module.exports = { getMultipartSignedUrls }