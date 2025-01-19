const { uploadMultipartFile, uploadPart, completeUpload } = require('../aws/aws-operations');

const startMultipartUpload = async (params) => {
    var upload = await uploadMultipartFile(params);
    return upload;
}

const uploadFilePart = async (fileName, partNumber, uploadId, fileChunk) => {
    var response = await uploadPart(fileName, partNumber, uploadId, fileChunk);
    return response;
}

const completeUpload = async (fileName, uploadId, parts) => {
    var response = await completeUpload(fileName, uploadId, parts);
    return response;
}

module.exports = { startMultipartUpload, uploadFilePart, completeUpload }
