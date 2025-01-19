var { uploadFile } = require('.././service/file.service');

const addFile = async () => {
    return await uploadFile();
}

module.exports = { addFile }