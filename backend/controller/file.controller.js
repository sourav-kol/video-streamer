var { startMultipartUpload, uploadFilePart, completeUpload } = require('.././service/file.service');

const start = async (fileName, fileType) => {
    var params = {
        fileName,
        fileType
    };
    return await startMultipartUpload(params);
}

const upload = async (fileName, partNumber, uploadId, fileChunk) => {
    return await uploadFilePart(fileName, partNumber, uploadId, fileChunk);
}

const complete = async (fileName, uploadId, parts) => {
    return await completeUpload(fileName, uploadId, parts);
}

module.exports = { start, upload, complete }