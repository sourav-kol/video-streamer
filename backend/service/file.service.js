const { uploadMultipartFile } = require('../aws/aws-operations');

const uploadFile = async () => {
    var url = await uploadMultipartFile();
    return url;
}

module.exports = { uploadFile }
