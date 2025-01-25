var { getSignedUrls } = require('.././service/file.service');

const getMultipartSignedUrls = async (req, res, next) => {
    const { key, totalParts, fileType } = req.body;

    var result = await getSignedUrls(key, totalParts, fileType);

    res.status(200).send(result);
}

module.exports = { getMultipartSignedUrls }