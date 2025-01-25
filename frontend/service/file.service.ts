import axios from "axios";
import { CHUNK_SIZE } from "@/constants/app-constants";
import { generateServerURL } from '../helper/urlHelper';

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
    var uploadVideoRes: uploadVideoResponse;

    const totalParts = Math.ceil(file.size / CHUNK_SIZE);

    console.log("totalParts: ", totalParts);

    var params = {
        key: fileName,
        fileType: fileType,
        totalParts: totalParts
    }
    //todo: fetch base url from env file...
    await axios.post(generateServerURL("file/signed/urls"), params)
        .then(res => {
            uploadVideoRes = res.data;
            console.log("urls: ", uploadVideoRes);
            return res.data as uploadVideoResponse;
        })
        .then((res) => {
            console.log("here!!");
            uploadFileChunkByPresignedURL(file, totalParts, res.urls);
        }).catch(err => {

        });
}

//todo: maybe, move to helper...?
const uploadFileChunkByPresignedURL = async (file: File, totalParts: number, preSignedUrl: string[]) => {
    if (totalParts != preSignedUrl.length) {
        console.log("error uploading......");
        return "error uploading video...";
    }

    var uploadPromise: Promise<any>[] = [];

    for (let partNumber = 0; partNumber < totalParts; partNumber++) {
        console.log("uploading to ", preSignedUrl[partNumber]);
        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const fileChunk = file.slice(start, end);
        uploadPromise.push(uploadToPresignedUrl(preSignedUrl[partNumber], fileChunk))
    }

    var uploadAllParts = await Promise.all(uploadPromise);

    console.log("presigned output: ", uploadAllParts);
}

const uploadToPresignedUrl = (preSignedUrl: string, chunk: Blob): Promise<any> => {
    return axios.put(preSignedUrl, chunk);
}