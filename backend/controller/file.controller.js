var { getSignedUrls } = require('.././service/file.service');

const getMultipartSignedUrls = async (req, res) => {
    console.log(req.body);
    const { key, uploadId, totalParts, fileType } = req.body;

    var result = await getSignedUrls(key, uploadId, totalParts, fileType);

    res.status(200).send(result);
}

module.exports = { getMultipartSignedUrls }