import axios from "axios";
import { CHUNK_SIZE } from "@/constants/app-constants";
import { generateServerURL } from '../helper/urlHelper';
import { v4 as uuidv4 } from 'uuid';

//todo: move to other file
type uploadVideoResponse = {
    urls: string[],
    uploadId: string
}

type completeUploadRequest = {
    etag: string,
    partNumber: number
}

const startUpload = async (key: string, fileType: string) => {
    var params = {
        key,
        fileType
    };
    return await axios.post(generateServerURL("file/upload/start"), params)
}

const uploadChunk = async (key: string, partNumber: number, fileType: string, uploadId: string, chunk: Blob) => {
    var params = {
        key,
        partNumber,
        fileType,
        uploadId,
        chunk
    };
    return await axios.post(generateServerURL("file/upload"), params)
}

const completeUpload = async (key: string, uploadId: string, parts: completeUploadRequest[]) => {
    var params = {
        key, uploadId, parts
    }
    await axios.post(generateServerURL("file/upload/complete"), params);
}

//todo: move to helper/component...
export const handleFileUpload = async (file: File) => {
    if (!file)
        return "Please select a file to be uplaoded!!!";

    const key = uuidv4();
    const fileType = file.type;
    var uploadVideoRes: uploadVideoResponse;

    const totalParts = Math.ceil(file.size / CHUNK_SIZE);

    var uploadId: string;
    let parts: completeUploadRequest[] = [];
    var uploadPromise: Promise<any>[] = [];

    await startUpload(key, fileType)
        .then(res => {
            uploadId = res.data;
            for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
                const start = (partNumber - 1) * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const fileChunk = file.slice(start, end);
                uploadPromise.push(uploadChunk(key, partNumber, fileType, res.data, fileChunk));
            }
        })
        .catch(err => {

        });

    var uploadAllParts = await Promise.all(uploadPromise);

    uploadAllParts.map((item, index) => {
        var temp: completeUploadRequest = {
            etag: JSON.parse(item.headers["etag"]),
            partNumber: index + 1
        }
        parts.push(temp)
    });

    await completeUpload(key, uploadId, parts);
}

//todo: maybe, move to helper...?
const uploadFileChunkByPresignedURL = async (file: File, totalParts: number, preSignedUrl: string[]): Promise<completeUploadRequest[]> => {
    let parts: completeUploadRequest[] = [];

    if (totalParts != preSignedUrl.length) {
        console.log("error uploading......");
        return parts;
    }

    var uploadPromise: Promise<any>[] = [];

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const fileChunk = file.slice(start, end);
        uploadPromise.push(uploadToPresignedUrl(preSignedUrl[partNumber - 1], fileChunk))
    }

    var uploadAllParts = await Promise.all(uploadPromise);

    uploadAllParts.map((item, index) => {
        var temp: completeUploadRequest = {
            etag: JSON.parse(item.headers["etag"]),
            partNumber: index + 1
        }
        parts.push(temp)
    })

    return parts;
}

const uploadToPresignedUrl = (preSignedUrl: string, chunk: Blob): Promise<any> => {
    return axios.put(preSignedUrl, chunk);
}