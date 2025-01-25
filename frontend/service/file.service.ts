import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { CHUNK_SIZE } from "@/constants/app-constants";

//todo: move to other file
type uploadVideoResponse = {
    urls: string[],
    uploadId: string
}

export const handleFileUpload = async (file: File) => {
    if (!file)
        return "Please select a file to be uplaoded!!!";

    const fileName = file.name;
    const fileType = file.type;
    let uploadId = uuidv4();
    var uploadVideoRes: uploadVideoResponse;

    const totalParts = Math.ceil(file.size / CHUNK_SIZE);

    console.log("totalParts: ", totalParts);

    var params = {
        key: fileName,
        fileType: fileType,
        uploadId: uploadId,
        totalParts: totalParts
    }
    //todo: fetch base url from env file...
    await axios.post("http://localhost:5000/file/signed/urls", params)
        .then(res => {
            uploadVideoRes = res.data;
            console.log("urls: ", uploadVideoRes);
        }).catch(err => {

        });


    //await uploadFileChunkByPresignedURL(file, totalParts, uploadVideoRes);
}


export const uploadFileChunkByPresignedURL = async (file: File, totalParts: number, preSignedUrl: string[]) => {
    if (totalParts != preSignedUrl.length)
        return "error uploading video...";

    var uploadPromise: Promise<any>[] = [];

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const fileChunk = file.slice(start, end);
        uploadPromise.push(uploadToPresignedUrl(preSignedUrl[partNumber], fileChunk))
    }

    await Promise.all(uploadPromise);
}

const uploadToPresignedUrl = (preSignedUrl: string, chunk: Blob): Promise<any> => {
    return axios.put(preSignedUrl, chunk);
}