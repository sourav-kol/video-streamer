'use client'

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { CHUNK_SIZE } from "@/constants/app-constants";

type Props = {

}

export default function UploadVideo() {
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    // const handleUploadFile = async () => {
    //     if (!file)
    //         return "No file selected!!!";

    //     const fileName = uuidv4();
    //     const fileType = file.type;
    //     let parts = [];

    //     try {
    //         //todo:
    //         //get base url from env file
    //         // Start the multipart upload
    //         const multipartUrl = await axios.post(
    //             "http://localhost:3001/file/signed/upload-url",
    //             {
    //                 fileName,
    //                 fileType,
    //             }
    //         );

    //         // Split the file into chunks and upload each part
    //         const totalParts = Math.ceil(file.size / CHUNK_SIZE);

    //         console.log(totalParts);

    //         for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
    //             const start = (partNumber - 1) * CHUNK_SIZE;
    //             const end = Math.min(start + CHUNK_SIZE, file.size);
    //             const fileChunk = file.slice(start, end);

    //             const reader = new FileReader();
    //             reader.readAsArrayBuffer(fileChunk);

    //             const uploadPart = () => {
    //                 return new Promise((resolve, reject) => {
    //                     reader.onload = async () => {
    //                         const fileChunkBase64 = btoa(
    //                             new Uint8Array(reader.result).reduce(
    //                                 (data, byte) => data + String.fromCharCode(byte),
    //                                 ""
    //                             )
    //                         );

    //                         const uploadPartResponse = await axios.post(
    //                             "http://localhost:3001/upload-part",
    //                             {
    //                                 fileName,
    //                                 partNumber,
    //                                 uploadId,
    //                                 fileChunk: fileChunkBase64,
    //                             }
    //                         );

    //                         parts.push({
    //                             ETag: uploadPartResponse.data.ETag,
    //                             PartNumber: partNumber,
    //                         });
    //                         resolve();
    //                     };
    //                     reader.onerror = reject;
    //                 });
    //             };

    //             await uploadPart();
    //         }
    //     } catch (err) {

    //     }
    // }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button disabled={!file} onClick={() => { }}>
                Upload
            </button>
            <hr />
            <br />
            {/* {fileUrl && (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    View Uploaded File
                </a>
            )} */}
        </div>
    );
}
